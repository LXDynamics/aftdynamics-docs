# Plan: Create Custom Docusaurus Plugin for Dynamic Blog Data

## Problem
Currently maintaining blog post data manually in `useBlogData.ts`, which breaks when filenames change and requires manual updates for each new post.

## Solution
Create a custom Docusaurus plugin that:
1. Hooks into the blog plugin's lifecycle
2. Extracts all blog post metadata during build
3. Generates a TypeScript file with the data
4. Makes it available to components

## Implementation Steps

### 1. Create Plugin Structure (`/plugins/blog-data-plugin/`)
- Main plugin file to hook into Docusaurus lifecycle
- Access blog content during `contentLoaded` phase

### 2. Extract Blog Data
- Read from blog plugin's content
- Format data to match our component needs
- Include all metadata (authors, tags, dates, etc.)

### 3. Generate TypeScript File
- Write to `src/generated/blogData.ts`
- Include proper types
- Export as const for type safety

### 4. Update Component
- Import from generated file instead of manual data
- Remove manual `useBlogData.ts`

### 5. Configure Plugin
- Add to `docusaurus.config.ts`
- Ensure it runs after blog plugin

## Benefits
- Automatic updates when blog posts change
- No manual maintenance
- Type-safe generated data
- Works with any filename changes
- Follows Docusaurus best practices

## Technical Details

### Plugin API
The plugin will use Docusaurus's lifecycle hooks:
- `loadContent`: Access blog plugin data
- `contentLoaded`: Process and generate TypeScript file

### Data Structure
```typescript
export interface BlogPost {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    description?: string;
    date: string;
    formattedDate: string;
    tags: Array<{
      label: string;
      permalink: string;
    }>;
    readingTime: number;
    authors: Array<{
      name: string;
      key: string;
      title?: string;
      url?: string;
      imageURL?: string;
    }>;
  };
}
```

### Generated File Location
- Path: `/src/generated/blogData.ts`
- Git ignored: Yes (add to `.gitignore`)
- Regenerated on each build

This approach ensures the blog data is always in sync with actual blog posts, eliminating manual maintenance.