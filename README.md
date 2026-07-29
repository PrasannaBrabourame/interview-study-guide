# Interview Study Guide

A static study guide for Technical Lead & AI Engineer interviews, covering 219 topics. No build step, no dependencies — just open `index.html` in a browser.

Each topic is broken down into:
- 🧠 Technical answer
- 💡 In layman's terms
- 🛠 Practical use cases
- 🎯 Follow-up interview checks
- ⚠ Red flags
- 📌 One-line memory aid

## Files

```
index.html        Page shell — markup only, no inline data or logic
assets/styles.css Styling (light/dark theme, layout, print styles)
assets/app.js     Rendering, search/filter, quiz mode, progress tracking
data/topics.js    The 219 topics as data (sets the `topics` global)
```

Data, styling, and behavior are split into separate files so each can be edited
and diffed independently — e.g. adding a topic only touches `data/topics.js`.
`topics.js` (not `.json`) so the page still works when opened straight from
disk with no server: a `<script src>` loads fine over `file://`, but
`fetch()`-ing a local JSON file is blocked by the browser's CORS policy.

## View locally

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — the site will be published at `https://<username>.github.io/<repo>/`.
