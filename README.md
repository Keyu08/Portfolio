# keyu.cuts: Portfolio

A one-page, conversion-focused portfolio for ad creative editing. It's a plain static site
(HTML/CSS/JS) with no build step.

- `index.html`: all copy and sections
- `styles.css`: design system (paper / ink / signal-orange palette)
- `main.js`: interactions (video autoplay, cursor, rotator, counters, tabs, reel modal)
- `docs/BLUEPRINT.md`: copy strategy, reel sequencing, and the case-study template
- `assets/videos/`: put your edits here

## Add your videos

The site looks for `assets/videos/<name>.mp4` (then `.mov`). Missing files show a labelled placeholder.

Needed: `vlog46`, `vlog27`, `vlog47`, `vlog41`, and optionally `showreel`.

Compress for the web (keeps them small and plays in every browser):

```bash
for f in vlog46 vlog27 vlog47 vlog41; do
  ffmpeg -i ~/Downloads/$f.mov -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow \
    -an -movflags +faststart assets/videos/$f.mp4
done
```

(`-an` strips audio. The previews autoplay muted anyway. Drop it for the showreel.)

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

Drag the folder into Netlify, or push to GitHub and enable GitHub Pages or Vercel.
