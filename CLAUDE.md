# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Docusaurus v3.8.1 documentation website for AFT Dynamics, a rocket engine manufacturing company. The site uses TypeScript, React, and MDX for creating rich documentation experiences.

## Key Commands

### Development
```bash
# Install dependencies
yarn

# Start development server (runs on http://localhost:3000)
yarn start

# Type check TypeScript files
yarn typecheck
```

### Build & Deploy
```bash
# Build static production site
yarn build

# Test production build locally
yarn serve

# Deploy to GitHub Pages
yarn deploy
# Deploy with SSH: USE_SSH=true yarn deploy

# Clear Docusaurus cache (if encountering build issues)
yarn clear
```

## Architecture & Structure

### Directory Layout
- `docs/` - Main documentation content in Markdown/MDX format
  - `index.md` - Introduction/landing page for docs
  - `business/` - Business model documentation
- `blog/` - Blog posts with automatic RSS/Atom feed generation
- `src/` - React components and custom pages
  - `components/` - Reusable React components
  - `pages/` - Additional standalone pages
  - `css/` - Global styles and CSS modules
- `static/` - Static assets served as-is
  - `img/` - Images, logos, and icons
- `contact/` - Contact information pages

### Configuration Files
- `docusaurus.config.ts` - Main site configuration (title, URL, themes, plugins)
- `sidebars.ts` - Documentation sidebar structure
- `tsconfig.json` - TypeScript configuration

### Key Technologies
- **Docusaurus 3.8.1** - Static site generator
- **React 19.0.0** - UI components
- **TypeScript** - Type safety
- **MDX** - Enhanced Markdown with React components
- **Mermaid** - Diagram support
- **KaTeX** - Mathematical expressions
- **Prism** - Syntax highlighting

## Development Guidelines

### Adding Documentation
1. Create `.md` or `.mdx` files in the `docs/` directory
2. Sidebars auto-generate from folder structure
3. Use frontmatter for metadata:
   ```yaml
   ---
   sidebar_position: 1
   title: Page Title
   ---
   ```

### Creating Components
1. Add React components to `src/components/`
2. Import and use in MDX files or pages
3. Follow existing component patterns (TypeScript, CSS Modules)

### Styling
- Use CSS Modules for component-specific styles
- Global styles go in `src/css/custom.css`
- Theme variables are defined in the CSS custom properties

### Important Notes
- The project is transitioning from default Docusaurus template
- Some navbar/footer links still reference default values
- Always run `yarn typecheck` before committing TypeScript changes
- Build locally with `yarn build` to catch any build-time errors
- The site deploys to https://aftdynamics.com via GitHub Pages