# DHANISA PA | Cybersecurity Portfolio

A static portfolio (HTML, CSS, vanilla JavaScript) for GitHub Pages. No build step, backend, or paid service.

## Folder structure
```text
dhanisapa.github.io/      <- example name only; use YOUR_GITHUB_USERNAME.github.io
├── index.html            page content (about, skills, education text)
├── css/style.css         styling
├── js/script.js          behavior + CONFIG block (links, email, projects)
├── assets/images, icons  optional files
├── resume/resume.pdf     add your resume here
└── README.md
```

## Open locally
Double-click `index.html`. Fonts load from Google Fonts when online; system fonts are used otherwise.

## Update your details
- **Everything configurable** is in the `CONFIG` block at the top of `js/script.js`.
- **Email:** set `email: "you@example.com"`. This turns on the Email button, Copy Email, and footer link.
- **LinkedIn / TryHackMe:** paste the full `https://` profile URL into `linkedin` and `tryhackme`.
- **GitHub:** set `github` to `https://github.com/YOUR_GITHUB_USERNAME`.
- **Project repositories:** set each project's `repo` to its full `https://` URL. Until then the button shows "not published yet". Edit `description`, `objective`, `tools`, `areas`, and `status` as your real work progresses. Only list tools you actually used.
- **Resume:** copy your PDF to `resume/resume.pdf`, then set `resumeAvailable: true` in `js/script.js`.
- **Name, intro, education:** edit the text in `index.html`.
- **Skill levels:** each skill has a label (Hands-on practice, Working knowledge, Learning, Exploring) in `index.html`. Change any label that does not match your real level.

## Deploy to GitHub Pages
1. Create a GitHub account if needed. Note your username.
2. Click **New repository**. Name it exactly `YOUR_GITHUB_USERNAME.github.io` (replace with your real username), set it Public, and create it.
3. Click **Add file > Upload files**. Drag in the **contents** of the folder (`index.html`, `css`, `js`, `assets`, `resume`, `README.md`) so `index.html` is at the repository root. Click **Commit changes**.
4. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. Wait 1 to 3 minutes. Your site is at `https://YOUR_GITHUB_USERNAME.github.io/`. The URL also appears at the top of the Pages settings page.

## Troubleshooting
- **No styling or scripts:** check that `css/style.css` and `js/script.js` exist with those exact lowercase names and are in folders, not at the root.
- **404 page:** `index.html` must be at the repository root, and the repository name must match your username exactly.
- **Resume buttons say "not added yet":** upload `resume/resume.pdf` and set `resumeAvailable: true`.
- **Changes not showing:** wait a minute, then hard-refresh (Ctrl+Shift+R).
- **Console errors:** press F12 and read the Console tab for the failing file path.
