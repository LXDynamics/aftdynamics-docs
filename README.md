# AFT Dynamics Website

Published website for AFT Dynamics - deployed to https://aftdynamics.com

## Repository Purpose

This repository contains the **built and deployed** version of the AFT Dynamics website. It serves as the production deployment target for the website source code maintained in `aft-public/website/`.

## Deployment Workflow

1. **Development**: Website source code is maintained in `aft-public/website/` (Docusaurus)
2. **Build**: Website is built using `npm run build` in the source repository
3. **Deploy**: Built files are committed to this repository for production deployment
4. **Hosting**: This repository serves the live website at https://aftdynamics.com

## Structure

- `docs/` - Built documentation pages
- `blog/` - Built blog pages and RSS feeds
- `assets/` - Static assets (CSS, JS, images)
- `index.html` - Main landing page
- `CNAME` - Domain configuration for GitHub Pages

## Deployment Commands

From the source repository (`aft-public/website/`):

```bash
# Build production site
npm run build

# Deploy to this repository
npm run deploy
```

## Domain Configuration

- **Production URL**: https://aftdynamics.com
- **Deployment**: GitHub Pages or Gitea Pages
- **DNS**: Custom domain configuration via CNAME

## Security Classification

**PUBLIC** - Production website deployment
