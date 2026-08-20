# Saaku Birthday Story

A cinematic, single-page birthday experience built with HTML, CSS, JavaScript, GSAP, and ScrollTrigger.

## Add your assets

Put personal photos in `assets/images/`. The default configuration expects:

- `saaku-01.jpg`
- `saaku-02.jpg`
- `saaku-03.jpg`
- `saaku-04.jpg`
- `saaku-05.jpg`

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
