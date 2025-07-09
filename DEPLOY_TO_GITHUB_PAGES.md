# Step-by-Step Guide: Deploying AFT Dynamics Docs to GitHub Pages

This guide will walk you through deploying your Docusaurus site to GitHub Pages.

## Prerequisites

- GitHub repository for your project
- Git installed locally
- npm installed locally
- GitHub personal access token (for deployment)

## Step 1: Update Docusaurus Configuration

Your `docusaurus.config.ts` already has the basic configuration set up correctly:
- `url: 'https://aftdynamics.com'` 
- `baseUrl: '/'`
- `organizationName: 'LXDynamics'`
- `projectName: 'aftdynamics-docs'`
- `trailingSlash: false`

However, you need to update the `editUrl` in the docs preset to point to your repository:

```typescript
editUrl: 'https://github.com/LXDynamics/aftdynamics-docs/tree/main/',
```

## Step 2: Add .nojekyll File

Create a `.nojekyll` file in the `static` directory to prevent GitHub Pages from processing files with Jekyll:

```bash
touch static/.nojekyll
```

## Step 3: Set Up GitHub Actions for Automated Deployment (Recommended)

Create the following GitHub Actions workflow files:

### A. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### B. Create `.github/workflows/test-deploy.yml`:

```yaml
name: Test deployment

on:
  pull_request:
    branches:
      - main

jobs:
  test-deploy:
    name: Test deployment
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Test build website
        run: npm run build
```

## Step 4: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - (The old "Deploy from a branch" option would use gh-pages branch)

## Step 5: Deploy Your Site

### Option A: Using GitHub Actions (Recommended)
1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
2. GitHub Actions will automatically build and deploy your site
3. Check the Actions tab in your repository to monitor the deployment

### Option B: Manual Deployment Using npm run deploy
1. Create a GitHub personal access token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` scope

2. Deploy using the command:
   ```bash
   # Using HTTPS (recommended)
   GIT_USER=<YOUR_GITHUB_USERNAME> npm run deploy

   # Or with personal access token
   GIT_USER=<USERNAME> GIT_PASS=<PERSONAL_ACCESS_TOKEN> npm run deploy

   # Or using SSH
   USE_SSH=true npm run deploy
   ```

## Step 6: Configure Custom Domain (if using aftdynamics.com)

1. Create a `CNAME` file in the `static` directory:
   ```bash
   echo "aftdynamics.com" > static/CNAME
   ```

2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `LXDynamics.github.io`
   - Or add A records pointing to GitHub's IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. In GitHub repository settings → Pages:
   - Add your custom domain
   - Enable "Enforce HTTPS"

## Step 7: Verify Deployment

1. Check GitHub Actions tab for successful deployment
2. Visit your site at:
   - GitHub Pages URL: `https://LXDynamics.github.io/aftdynamics-docs`
   - Custom domain: `https://aftdynamics.com` (after DNS propagation)

## Troubleshooting

- **Build failures**: Check GitHub Actions logs for errors
- **404 errors**: Ensure `baseUrl` matches your deployment path
- **Custom domain issues**: DNS propagation can take up to 24 hours
- **Missing styles**: Verify `.nojekyll` file exists in static directory

## Important Notes

- The GitHub Actions method is recommended as it's more secure and automated
- Always test builds locally with `npm run build` before pushing
- Keep your personal access tokens secure and never commit them
- The site may take a few minutes to appear after first deployment