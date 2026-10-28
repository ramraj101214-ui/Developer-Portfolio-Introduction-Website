# Deepak — Developer Portfolio & Introduction Website

A clean, modern, and fully responsive single-page personal website showcasing developer skills, projects, and contact information. Built with zero external JS framework dependencies using **HTML5**, **CSS3**, and **JavaScript (ES6+)**.

---

## ✨ Features

- **🎨 Modern Dark Glassmorphism Design:** Deep slate color scheme with smooth gradients and glass card effects.
- **📱 Fully Responsive:** Optimized layout for desktop, tablet, and mobile devices with a slide-out drawer menu.
- **⚡ Fast & Lightweight:** Zero build step needed; loads instantly in any web browser.
- **📊 Scroll-Triggered Animations:** Animated stat counters and skill progress bars that activate when scrolled into view.
- **💡 Interactive Project Modals:** Live demo modals allowing users to test SQL task management and AI workflow tools directly in the browser.
- **✉️ Real-Time Form Validation:** Client-side contact form validation with accessible warning states and toast notifications.

---

## 📁 File Structure

```
introduction-website/
├── index.html        # Semantic HTML structure & page layout
├── style.css         # Styling, design tokens, flex/grid layouts & animations
├── script.js        # Interactive logic, navigation, animations & demo modals
└── assets/           # Images, avatars, and project screenshots
```

---

## 🚀 How to Run Locally

1. Clone or download this repository.
2. Open `index.html` directly in any web browser (or use a local server like VS Code *Live Server*).

---

## 🌐 How to Publish Live on GitHub Pages

Follow these steps to deploy this site live on GitHub:

1. **Create a GitHub Repository:**
   - Go to [GitHub New Repository](https://github.com/new).
   - Name your repository (e.g., `introduction-website`).
   - Set visibility to **Public**.
   - Do **NOT** initialize with a README if you already have local files. Click **Create repository**.

2. **Upload / Push Your Files:**
   - **Using Git CLI:**
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Developer Portfolio site"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```
   - **Or Using GitHub Web UI:**
     - Click **"uploading an existing file"** on your new repository page.
     - Drag and drop all files (`index.html`, `style.css`, `script.js`, `.nojekyll`, `.gitignore`, `assets/`, `.github/`).
     - Commit the changes.

3. **Enable GitHub Pages:**
   - In your GitHub repository, go to **Settings** → **Pages** (under Code and automation).
   - Under **Build and deployment** → **Source**, select **GitHub Actions** (or **Deploy from a branch** set to `main` / `/root`).
   - GitHub Actions will automatically build and publish your site!

4. **Access Your Live Website:**
   - Your site will be live at: `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`
