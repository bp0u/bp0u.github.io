# Personal Portfolio Website

A modern, single-page personal portfolio built with plain HTML, CSS, and JavaScript.

This project showcases:
- Hero section with profile highlights
- About, Skills, Projects, and Contact sections
- Theme toggle (light/dark mode)
- Scroll-based reveal animations
- Active navigation highlighting
- Custom cursor effects (desktop hover devices)

## Project Structure

- `index.html` - main page structure and content
- `style.css` - full styling, layout, responsive rules, and animations
- `script.js` - interactive behavior (theme, scroll effects, section tracking, cursor)

## How to Run

Because this is a static site, no build tools are required.

### Option 1: Open directly
1. Double-click `index.html`
2. It opens in your default browser

### Option 2: Use VS Code / Cursor Live Server (recommended)
1. Install a Live Server extension if needed
2. Right-click `index.html`
3. Choose **Open with Live Server**

## Features

- **Responsive Design**: Adapts to desktop and mobile layouts
- **Theme Persistence**: Saves selected theme using `localStorage`
- **Smooth UX**: Subtle motion and section reveal transitions
- **Accessible Links**: Proper labels and safe external link attributes

## Customization Guide

Edit these areas in `index.html`:
- Name, title, and introduction in the Hero section
- About text and contact details
- Skills percentages and categories
- Project cards and links
- Footer year and social links

Style updates:
- Colors, typography, spacing, and animations in `style.css`

Behavior updates:
- Theme logic, animation observer, and nav activity in `script.js`

## Notes

- Keep all three files in the same folder so relative paths work:
  - `index.html`
  - `style.css`
  - `script.js`
- If changes do not appear in browser, do a hard refresh (`Ctrl+F5`).

## License

This project is personal portfolio code. You can reuse and modify it for your own portfolio.
