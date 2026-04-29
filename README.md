# Personal Portfolio Website

A modern, single-page personal portfolio built with plain HTML, CSS, and JavaScript.

## This project showcases

- Hero section with profile highlights
- About, Skills, Projects, and Contact sections
- Theme toggle (light/dark mode)
- Scroll-based reveal animations
- Active navigation highlighting
- Custom cursor effects (desktop hover devices)
- Dynamic project loading from `projects.json`

## Project Structure

- `index.html` — main page structure and content
- `style.css` — full styling, layout, responsive rules, and animations
- `script.js` — interactive behavior (theme, scroll effects, section tracking, cursor)
- `projects.json` — project data loaded dynamically at runtime

## How to Run

Because this is a static site, no build tools are required.

### Option 1: Open directly

1. Double-click `index.html`
2. It opens in your default browser

### Option 2: Use VS Code / Live Server (recommended)

1. Install the Live Server extension if needed
2. Right-click `index.html`
3. Choose **Open with Live Server**

## Features

- **Responsive Design** — adapts to desktop and mobile layouts
- **Theme Persistence** — saves selected theme using `localStorage`
- **Smooth UX** — subtle motion and section reveal transitions
- **Accessible Links** — proper labels and safe external link attributes
- **JSON-driven Projects** — add or remove projects by editing `projects.json` only

## Adding a Project

Open `projects.json` and add a new entry:

```json
{
  "title": "Your Project Name",
  "description": "What it does and why it matters.",
  "tags": ["React", "Node.js"],
  "link": "https://github.com/bp0u/your-repo",
  "linkLabel": "View project"
}
```

Then push to GitHub — no HTML changes needed.

## Customization Guide

- **Content** — edit name, bio, skills, and contact details in `index.html`
- **Styles** — colors, typography, spacing, and animations in `style.css`
- **Behavior** — theme logic, animation observer, and nav activity in `script.js`

## Notes

- Keep all files in the same folder so relative paths work
- If changes do not appear in the browser, do a hard refresh (`Ctrl+F5`)

## License

This project is personal portfolio code. You are free to reuse and modify it for your own portfolio.
