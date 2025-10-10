# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is the **production deployment repository** for the AFT Dynamics website. It contains built, static files that are served at <https://aftdynamics.com>.

**IMPORTANT**: This repository contains build artifacts only. All development and content changes must be made in `aft-public/website/` (the source repository).

## Relationship to Source Repository

### aft-public/website/ (Source - DO WORK HERE)

- Docusaurus source code with React components
- MDX content files for pages and blog posts
- Development server (`npm start`)
- Build and deployment scripts

### aft-website/ (Deployment - THIS REPO)

- Built static HTML/CSS/JS files only
- Production-ready output from `npm run build`
- Deployment configuration (CNAME)
- Served directly by hosting platform

## Common Tasks

### Deploying Website Updates

**From the source repository** (`aft-public/website/`):

```bash
# Build and deploy in one command
npm run deploy

# Or manually:
npm run build              # Builds to build/ directory
# Then commit/push build output to this repository
```

### Verifying Deployment

```bash
# Check the live site
curl -I https://aftdynamics.com

# Inspect specific files in this repo
cat CNAME                  # Should show: aftdynamics.com
ls -lh index.html blog/ assets/ contact/ img/
```

### Domain Configuration

The `CNAME` file configures the custom domain:

```text
aftdynamics.com
```

This file must exist for GitHub/Gitea Pages to serve the site at the custom domain.

## Repository Structure

```text
/
├── index.html              # Landing page (Docusaurus build output)
├── blog.html               # Blog listing page
├── docs.html               # Documentation page
├── contact.html            # Team/contact page
├── 404.html                # Error page
├── CNAME                   # Domain: aftdynamics.com
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── blog/                   # Blog posts and RSS/Atom feeds
│   ├── *.html              # Individual blog post pages
│   ├── rss.xml             # RSS feed
│   ├── atom.xml            # Atom feed
│   └── tags/               # Tag archives
├── contact/                # Team member pages
│   └── alexander-wright-phd.html
├── assets/                 # Bundled static assets
│   ├── css/                # Docusaurus CSS bundles
│   ├── js/                 # Docusaurus JS bundles
│   └── images/             # Processed images
└── img/                    # Static images
    ├── logo.svg            # AFT logo
    ├── favicon.ico         # Site favicon
    └── *.jpg               # Team photos
```

## Key Technology Details

- **Built with**: Docusaurus 3.8.1 (as seen in HTML meta tags)
- **Hosting**: Gitea Pages (remote: `Gitea-clone:AFTdynamics/website.git`)
- **Domain**: aftdynamics.com (configured via CNAME)
- **RSS/Atom**: Blog feeds available at `/blog/rss.xml` and `/blog/atom.xml`

## Important Notes

1. **Never edit files directly in this repository** - all changes must come from the source repository build process
2. **This is a static site** - no server-side code, databases, or build tools exist here
3. **Git history shows deployments** - each commit represents a production deployment from the source
4. **Deployment method**: Source repository uses `npm run deploy` which builds and pushes to this repo

## Security Classification

**PUBLIC** - Production website content
