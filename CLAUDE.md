# CLAUDE.md - AFT Website Repository

This repository contains the deployed/published AFT Dynamics website.

## Repository Purpose

This is the **production deployment repository** for the AFT Dynamics website. It contains the built, static files that are served to users at https://aftdynamics.com.

## Relationship to Other Repositories

### aft-public/website/ (Source)
- Contains Docusaurus source code
- React components and MDX content
- Development server and build tools
- npm packages and configuration

### aft-website/ (Deployment - THIS REPO)  
- Contains built static HTML/CSS/JS
- Production-ready files
- Deployment configuration
- Domain and hosting setup

## Deployment Workflow

1. **Source Development**: Work done in `aft-public/website/`
2. **Build Process**: `npm run build` generates static files
3. **Deployment**: Built files pushed to this repository  
4. **Hosting**: Repository serves live website

## Key Files

- `index.html` - Main landing page
- `CNAME` - Custom domain configuration
- `docs/` - Documentation pages (built)
- `blog/` - Blog posts and feeds (built)
- `assets/` - CSS, JavaScript, images

## Deployment Configuration

### Custom Domain Setup
```
# CNAME file content
aftdynamics.com
```

### Build Output Structure
```
/
├── index.html              # Landing page
├── docs/                   # Documentation
├── blog/                   # Blog and feeds
├── assets/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── CNAME                   # Domain config
```

## Hosting Options

- **GitHub Pages**: Deploy via GitHub Actions
- **Gitea Pages**: Deploy via Gitea CI/CD  
- **Custom Hosting**: Any static site host

## Security Classification
**PUBLIC** - Production website content
