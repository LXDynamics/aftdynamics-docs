# Plan: Create Custom Docusaurus Plugin for Dynamic Blog Data

## Problem
Currently maintaining blog post data manually in `useBlogData.ts`, which breaks when filenames change and requires manual updates for each new post.

## Solution
Create a custom Docusaurus plugin that:
1. Hooks into the blog plugin's lifecycle
2. Extracts all blog post metadata during build
3. Generates a TypeScript file with the data
4. Makes it available to components

## Implementation Steps with Parallel Execution

### Phase 1: Setup and Research (Parallel Tasks)
**Agent 1: Plugin Structure**
- Create `/plugins/blog-data-plugin/` directory structure
- Set up basic plugin boilerplate with TypeScript support
- Create package.json for the plugin

**Agent 2: Research Docusaurus Plugin API**
- Study Docusaurus plugin lifecycle hooks
- Find examples of plugins that read blog data
- Document the correct way to access blog content

**Agent 3: TypeScript Setup**
- Create TypeScript interfaces for blog data
- Set up generated directory structure (`src/generated/`)
- Update `.gitignore` to exclude generated files

### Phase 2: Implementation (Parallel Tasks)
**Agent 1: Plugin Core Logic** (depends on Phase 1 Agents 1 & 2)
- Implement `loadContent` hook to access blog data
- Implement `contentLoaded` hook to process data
- Handle edge cases (no posts, missing metadata)

**Agent 2: Data Generation** (depends on Phase 1 Agent 3)
- Create file generation logic
- Format data as TypeScript const
- Ensure proper escaping and formatting

**Agent 3: Component Updates** (depends on Phase 1 Agent 3)
- Update `AuthorBlogPosts` to use generated data
- Remove manual `useBlogData.ts`
- Update imports and types

**Note:** Phase 1 must complete before Phase 2 can begin due to these dependencies.

### Phase 3: Integration and Testing
**Single Task: Configuration**
- Add plugin to `docusaurus.config.ts`
- Test build process
- Verify generated files
- Test with different blog post scenarios

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