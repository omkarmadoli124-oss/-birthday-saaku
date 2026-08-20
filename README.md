# Saaku Birthday Story

A cinematic, single-page birthday experience built with HTML, CSS, JavaScript, GSAP, and ScrollTrigger.

## Add your assets

Put personal photos in `assets/images/`. The current configuration uses:

- `WhatsApp Image 2026-08-20 at 11.57.46 AM (5).jpg`
- `WhatsApp Image 2026-08-20 at 11.57.46 AM (1).jpeg`
- `WhatsApp Image 2026-08-20 at 11.57.47 AM.jpeg`

Put the uploaded song at `assets/music/birthday-song.mp3`. Music only starts after clicking `Enter the story`.

If your filenames differ, update `CONFIG.images` and `CONFIG.memories` at the top of `script.js`.

## Edit the story

Open `script.js` and edit the `CONFIG` object. It contains the name, sign-off name, photo filenames, memory captions, and the personal message used by both the message scene and the surprise envelope.

## Run locally

Because browsers restrict some local asset behavior, serve the folder with a local static server. With Python installed:

```powershell
cd "c:\Users\CC\New folder (3)"
python -m http.server 8000
```

Then open http://localhost:8000 in a browser. No build step is required.
