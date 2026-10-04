const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const FFMPEG = 'C:\\Users\\DELL\\saree website\\ffmpeg-7.1-essentials_build\\bin\\ffmpeg.exe';
const INPUT = path.resolve(__dirname, '../../intro.mp4');
const OUT_DIR = path.resolve(__dirname, '../public/hero');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log('1. Generating base cropped, color-whitened video (9.5s)...');
// Crop 800:1000:560:60, scale to 768:960, fps=24, whiten bg
const tempBase = path.join(OUT_DIR, 'temp_base.mp4');
execSync(
  `"${FFMPEG}" -y -ss 0.2 -t 9.5 -i "${INPUT}" -vf "crop=800:1000:560:60,scale=768:960,fps=24,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98" -c:v libx264 -crf 20 -c:a aac -b:a 128k "${tempBase}"`,
  { stdio: 'inherit' }
);

console.log('2. Creating seamless loop video with crossfade (hero.mp4)...');
const heroMp4 = path.join(OUT_DIR, 'hero.mp4');
// Using xfade on video and acrossfade on audio
// Total duration 9.5s -> fade last 0.5s into first 0.5s -> 9.0s seamless loop
execSync(
  `"${FFMPEG}" -y -i "${tempBase}" -filter_complex "[0:v]split=2[v1][v2]; [v1]trim=0:9.0,setpts=PTS-STARTPTS,fps=24[vA]; [v2]trim=8.5:9.5,setpts=PTS-STARTPTS,fps=24[vB]; [vA][vB]xfade=transition=fade:duration=0.5:offset=8.5[vout]; [0:a]asplit=2[a1][a2]; [a1]atrim=0:9.0,asetpts=PTS-STARTPTS[aA]; [a2]atrim=8.5:9.5,asetpts=PTS-STARTPTS[aB]; [aA][aB]acrossfade=d=0.5:c1=tri:c2=tri[aout]" -map "[vout]" -map "[aout]" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "${heroMp4}"`,
  { stdio: 'inherit' }
);

console.log('3. Exporting WebM VP9 / Opus (hero.webm)...');
const heroWebm = path.join(OUT_DIR, 'hero.webm');
execSync(
  `"${FFMPEG}" -y -i "${heroMp4}" -c:v libvpx-vp9 -crf 36 -b:v 0 -c:a libopus -b:a 80k "${heroWebm}"`,
  { stdio: 'inherit' }
);

console.log('4. Exporting portrait-bust.webp (480x600 head-to-shirt crop)...');
// Crop around head and shirt: 500:625:610:80 -> scale to 480:600
const portraitBust = path.join(PUBLIC_DIR, 'portrait-bust.webp');
execSync(
  `"${FFMPEG}" -y -ss 00:00:01 -i "${INPUT}" -vf "crop=500:625:610:70,scale=480:600,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98" -vframes 1 "${portraitBust}"`,
  { stdio: 'inherit' }
);

console.log('5. Exporting og.jpg (1200x630)...');
const ogJpg = path.join(PUBLIC_DIR, 'og.jpg');
execSync(
  `"${FFMPEG}" -y -ss 00:00:01 -i "${INPUT}" -vf "scale=1200:675,crop=1200:630:0:22,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98" -vframes 1 "${ogJpg}"`,
  { stdio: 'inherit' }
);

// Cleanup temp file
if (fs.existsSync(tempBase)) {
  fs.unlinkSync(tempBase);
}

console.log('All hero media assets successfully built!');
