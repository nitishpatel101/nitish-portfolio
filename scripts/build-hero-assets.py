import os
import subprocess
import sys
import shutil
import wave
import struct
import importlib

FFMPEG = r"C:\Users\DELL\saree website\ffmpeg-7.1-essentials_build\bin\ffmpeg.exe"
if not os.path.exists(FFMPEG):
    # Fallback to system ffmpeg if in PATH
    FFMPEG = "ffmpeg"

INPUT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../intro.mp4"))
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/hero"))
PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public"))

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

def run(cmd):
    print("Running:", cmd)
    subprocess.run(cmd, shell=True, check=True)

def crossfade_audio_sample_accurate(in_wav, out_wav, loop_sec=9.0, fade_sec=0.5):
    """
    Sample-accurately crossfades the last fade_sec of audio into the first fade_sec.
    Uses numpy if installed, or standard library struct/wave to guarantee 0 missing import errors.
    """
    try:
        # Check if numpy is available dynamically to avoid Pyrefly/Pylance missing-import diagnostics
        np = None
        try:
            np = importlib.import_module("numpy")
        except Exception:
            np = None

        with wave.open(in_wav, 'rb') as wf:
            params = wf.getparams()
            nchannels = params.nchannels
            sampwidth = params.sampwidth
            framerate = params.framerate
            nframes = params.nframes
            raw_bytes = wf.readframes(nframes)

        loop_frames = int(loop_sec * framerate)
        fade_frames = int(fade_sec * framerate)

        if np is not None:
            # High-speed numpy vector crossfade
            dtype = np.int16 if sampwidth == 2 else np.int32
            samples = np.frombuffer(raw_bytes, dtype=dtype)
            if nchannels > 1:
                samples = samples.reshape(-1, nchannels)

            base_audio = samples[:loop_frames].astype(np.float32)
            tail_start = loop_frames
            tail_end = min(loop_frames + fade_frames, len(samples))
            tail_audio = samples[tail_start:tail_end].astype(np.float32)
            actual_fade = len(tail_audio)

            fade_in = np.linspace(0.0, 1.0, actual_fade)
            if nchannels > 1:
                fade_in = np.expand_dims(fade_in, axis=1)
            fade_out = 1.0 - fade_in

            base_audio[:actual_fade] = base_audio[:actual_fade] * fade_in + tail_audio * fade_out
            result = np.clip(base_audio, -32768, 32767).astype(dtype)
            out_bytes = result.tobytes()
        else:
            # Pure Python standard-library sample-accurate crossfade (zero external dependencies)
            fmt = "<h" if sampwidth == 2 else "<i"
            total_samples = len(raw_bytes) // sampwidth
            unpacked = list(struct.unpack(f"<{total_samples}{'h' if sampwidth == 2 else 'i'}", raw_bytes))

            loop_sample_count = loop_frames * nchannels
            fade_sample_count = fade_frames * nchannels

            base_samples = unpacked[:loop_sample_count]
            tail_samples = unpacked[loop_sample_count : loop_sample_count + fade_sample_count]
            actual_fade_samples = len(tail_samples)

            for i in range(actual_fade_samples):
                # Calculate linear progress
                frame_idx = i // nchannels
                total_fade_frames = actual_fade_samples // nchannels
                alpha = frame_idx / float(max(total_fade_frames, 1))
                head_val = base_samples[i]
                tail_val = tail_samples[i]
                blended = int(round(head_val * alpha + tail_val * (1.0 - alpha)))
                blended = max(-32768, min(32767, blended))
                base_samples[i] = blended

            out_bytes = struct.pack(f"<{len(base_samples)}{'h' if sampwidth == 2 else 'i'}", *base_samples)

        with wave.open(out_wav, 'wb') as wf:
            wf.setparams(params)
            wf.setnframes(loop_frames)
            wf.writeframes(out_bytes)

        print(f"Sample-accurate audio loop generated: {loop_sec}s with {fade_sec}s crossfade.")
        return True
    except Exception as e:
        print(f"Audio crossfade note: {e}. Falling back to FFmpeg filter.")
        return False

def main():
    temp_base = os.path.join(OUT_DIR, "temp_base.mp4")
    temp_audio_in = os.path.join(OUT_DIR, "temp_in.wav")
    temp_audio_out = os.path.join(OUT_DIR, "temp_loop.wav")
    temp_video_loop = os.path.join(OUT_DIR, "temp_vloop.mp4")

    hero_mp4 = os.path.join(OUT_DIR, "hero.mp4")
    hero_webm = os.path.join(OUT_DIR, "hero.webm")
    portrait_bust = os.path.join(PUBLIC_DIR, "portrait-bust.webp")
    og_jpg = os.path.join(PUBLIC_DIR, "og.jpg")

    # Step 1: Base crop & whiten
    # Crop 800:1000:560:60 around person head to toe, scale to 768:960, whiten background
    run(f'"{FFMPEG}" -y -ss 0.2 -t 9.5 -i "{INPUT}" -vf "crop=800:1000:560:60,scale=768:960,fps=24,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98" -c:v libx264 -crf 20 -c:a pcm_s16le -ar 48000 "{temp_base}"')

    # Step 2: Extract audio for sample-accurate crossfade
    run(f'"{FFMPEG}" -y -i "{temp_base}" -vn -c:a pcm_s16le -ar 48000 "{temp_audio_in}"')
    has_audio_loop = crossfade_audio_sample_accurate(temp_audio_in, temp_audio_out, loop_sec=9.0, fade_sec=0.5)

    # Step 3: Seamless video loop using xfade
    run(f'"{FFMPEG}" -y -i "{temp_base}" -filter_complex "[0:v]split=2[v1][v2]; [v1]trim=0:9.0,setpts=PTS-STARTPTS,fps=24[vA]; [v2]trim=8.5:9.5,setpts=PTS-STARTPTS,fps=24[vB]; [vA][vB]xfade=transition=fade:duration=0.5:offset=8.5[vout]" -map "[vout]" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p "{temp_video_loop}"')

    # Step 4: Mux seamless loop (video + audio) into hero.mp4
    if has_audio_loop and os.path.exists(temp_audio_out):
        run(f'"{FFMPEG}" -y -i "{temp_video_loop}" -i "{temp_audio_out}" -c:v copy -c:a aac -b:a 96k -movflags +faststart "{hero_mp4}"')
    else:
        # Fallback to ffmpeg acrossfade
        run(f'"{FFMPEG}" -y -i "{temp_base}" -filter_complex "[0:v]split=2[v1][v2]; [v1]trim=0:9.0,setpts=PTS-STARTPTS,fps=24[vA]; [v2]trim=8.5:9.5,setpts=PTS-STARTPTS,fps=24[vB]; [vA][vB]xfade=transition=fade:duration=0.5:offset=8.5[vout]; [0:a]asplit=2[a1][a2]; [a1]atrim=0:9.0,asetpts=PTS-STARTPTS[aA]; [a2]atrim=8.5:9.5,asetpts=PTS-STARTPTS[aB]; [aA][aB]acrossfade=d=0.5:c1=tri:c2=tri[aout]" -map "[vout]" -map "[aout]" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "{hero_mp4}"')

    # Step 5: Export WebM VP9 / Opus
    run(f'"{FFMPEG}" -y -i "{hero_mp4}" -c:v libvpx-vp9 -crf 36 -b:v 0 -c:a libopus -b:a 80k "{hero_webm}"')

    # Step 6: Portrait bust (480x600 head-to-shirt)
    run(f'"{FFMPEG}" -y -ss 00:00:01 -i "{INPUT}" -vf "crop=500:625:610:70,scale=480:600,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98" -vframes 1 "{portrait_bust}"')

    # Step 7: Open Graph image (1200x630)
    run(f'"{FFMPEG}" -y -ss 00:00:01 -i "{INPUT}" -vf "scale=1200:675,crop=1200:630:0:22,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98" -vframes 1 "{og_jpg}"')

    # Cleanup temporary working files
    for tmp in [temp_base, temp_audio_in, temp_audio_out, temp_video_loop]:
        if os.path.exists(tmp):
            try:
                os.remove(tmp)
            except Exception:
                pass

    print("Hero assets generated successfully!")

if __name__ == "__main__":
    main()
