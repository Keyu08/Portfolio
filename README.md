# keyu.cuts: Portfolio

A one-page, conversion-focused portfolio for ad creative editing. It's a plain static site
(HTML/CSS/JS) with no build step.

- `index.html`: all copy and sections
- `styles.css`: design system (paper / ink / signal-orange palette)
- `main.js`: interactions (video autoplay, cursor, rotator, counters, tabs, reel modal)
- `docs/BLUEPRINT.md`: copy strategy, reel sequencing, and the case-study template
- `assets/videos/`: put your edits here

## Add your videos

Copy your files into `assets/videos/` with their names unchanged. The site tries
`<name>.mp4`, then `<name>.MP4`, then `<name>.mov`. Missing files show a labelled placeholder.

| File | Shown as | Where it's used |
|---|---|---|
| storytelling1.MP4 | 9:16 | Hero, Services (Grow), reel fallback, vertical rail |
| storytelling2.MP4 | 9:16 | Hero, vertical rail |
| storytelling3.MP4 | 9:16 | Hero, Selected work 01 |
| storytelling4.MP4 | 9:16 | Services (Capture), vertical rail |
| launchvideo.mov | 9:16 | Services (Elevate), vertical rail |
| vibeyvlog3.mov | 16:9 (cropped) | Selected work 02 |
| ugc1.mov | 16:9 (cropped) | Selected work 03 |
| edits2.mov, edits3.mov, vibeyvlog2.mov | 16:9 (cropped) | Widescreen gallery |
| edits1.mov | 4:3 | Widescreen gallery |
| storytelling5.mov | 4:3 (cropped) | Widescreen gallery |

**Cropping:** the letterboxed 9:16 exports are cropped *on display*. Their frame is 16:9 or 4:3,
so the black bars fall outside it. You can drop the originals in as-is.

**Recommended before going online:** really crop and compress them. That cuts out the
black bars from the file, makes them much smaller, and plays in every browser.
(Install ffmpeg on a Mac with `brew install ffmpeg`. Run from the project folder.)

```bash
cd ~/Downloads   # wherever the originals are
OUT=~/path/to/Portfolio/assets/videos

# 9:16 → keep as-is, just compress
for f in storytelling1.MP4 storytelling2.MP4 storytelling3.MP4 storytelling4.MP4 launchvideo.mov; do
  ffmpeg -i "$f" -vf "scale=720:-2" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart "$OUT/${f%.*}.mp4"
done

# letterboxed 9:16 → crop the middle to 16:9
for f in ugc1.mov edits2.mov edits3.mov vibeyvlog2.mov vibeyvlog3.mov; do
  ffmpeg -i "$f" -vf "crop=iw:trunc(iw*9/16/2)*2,scale=1280:-2" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart "$OUT/${f%.*}.mp4"
done

# letterboxed 9:16 → crop the middle to 4:3
ffmpeg -i storytelling5.mov -vf "crop=iw:trunc(iw*3/4/2)*2,scale=1024:-2" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart "$OUT/storytelling5.mp4"

# already 4:3 → compress
ffmpeg -i edits1.mov -vf "scale=1024:-2" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart "$OUT/edits1.mp4"
```

(`-an` removes audio, since previews autoplay muted. Leave it out for a showreel.)
If the picture in a letterboxed file isn't perfectly centred, adjust the crop's y offset,
e.g. `crop=iw:trunc(iw*9/16/2)*2:0:400`.

## Adding more videos later

Copy any `<figure ... data-video="...">` line in `index.html` and change the name:
- vertical: `class="phone phone--flat"`
- 16:9: add `frame--169`
- 4:3: add `frame--43`

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Drag the folder into Netlify, or push to GitHub and enable GitHub Pages or Vercel.
