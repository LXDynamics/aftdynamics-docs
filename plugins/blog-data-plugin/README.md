# AFT Dynamics Blog Data Plugin

A Docusaurus plugin that provides blog metadata as global data for the AFT Dynamics documentation site.

## Features

- Exposes blog posts metadata as global data
- Provides recent posts functionality
- Includes tag information and counts
- TypeScript support with comprehensive type definitions
- Automatically watches blog files for changes during development

## Usage

Add the plugin to your `docusaurus.config.ts`:

```typescript
module.exports = {
  plugins: [
    [
      './plugins/blog-data-plugin',
      {
        blogDir: 'blog',
        routeBasePath: 'blog',
        postsPerPage: 10,
        includeReadingTime: true,
        recentPostsCount: 5
      }
    ]
  ]
};
```

## Accessing Data

Use the `useGlobalData` hook to access blog data in your components:

```typescript
import useGlobalData from '@docusaurus/useGlobalData';

function MyComponent() {
  const { blogData } = useGlobalData()['aftdynamics-blog-data-plugin'];
  
  return (
    <div>
      <h2>Recent Posts</h2>
      {blogData.recentPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Configuration Options

- `blogDir`: Directory containing blog posts (default: 'blog')
- `routeBasePath`: Base path for blog routes (default: 'blog')  
- `postsPerPage`: Number of posts per page (default: 10)
- `includeReadingTime`: Include reading time calculation (default: true)
- `recentPostsCount`: Number of recent posts to include (default: 5)

## Development

This plugin is part of the AFT Dynamics documentation site and follows Docusaurus plugin conventions.