# Blog Data Generation Utilities

This directory contains utilities for generating TypeScript files with blog data for the Docusaurus site. The utilities are designed to be used within a Docusaurus plugin to create type-safe, statically generated blog data.

## Files Overview

### Core Generation Logic
- **`blogDataGenerator.ts`** - Core utilities for generating TypeScript file content
- **`blogDataGeneratorHelpers.ts`** - Helper functions for file system operations and testing
- **`blogDataPlugin.ts`** - Integration utilities for Docusaurus plugin usage

### Key Features

1. **Type-Safe Generation**: All generated files use proper TypeScript interfaces
2. **String Escaping**: Comprehensive escaping for safe inclusion in TypeScript code
3. **Validation**: Built-in validation for blog archive data structures
4. **Flexible Output**: Support for both Docusaurus actions and file system operations
5. **Error Handling**: Graceful fallbacks and comprehensive error messages

## Usage

### Basic File Generation

```typescript
import { generateDataFileContent, createEmptyBlogArchive } from './blogDataGenerator';

// Create blog archive data
const blogArchive = createEmptyBlogArchive();

// Generate TypeScript file content
const content = generateDataFileContent(blogArchive);
```

### Using with Docusaurus Plugin

```typescript
import { blogDataPlugin } from './blogDataPlugin';

// In your docusaurus.config.ts
module.exports = {
  plugins: [
    [
      './src/utils/blogDataPlugin',
      {
        includePlaceholderData: true, // For development
        customBlogData: myCustomData  // Optional custom data
      }
    ]
  ]
};
```

### File System Operations

```typescript
import { generateAllFiles } from './blogDataGeneratorHelpers';

// Generate all files to a directory
await generateAllFiles(
  '/path/to/generated',
  blogArchive,
  true // Use file system instead of Docusaurus actions
);
```

## Generated File Structure

The utilities generate three main files:

### `types.ts`
Contains TypeScript interfaces:
- `BlogTag` - Tag information
- `BlogAuthor` - Author details
- `BlogPostMetadata` - Post metadata
- `BlogPost` - Complete post structure
- `BlogArchive` - Archive with posts, years, and tags

### `data.ts`
Contains the actual blog data:
```typescript
export const blogArchive: BlogArchive = {
  posts: [...],
  totalCount: 5,
  years: [...],
  tags: [...]
};
```

### `index.ts`
Re-exports all types and data for easy importing

## String Escaping

The utilities handle comprehensive string escaping for safe TypeScript generation:

- Backslashes: `\\` → `\\\\`
- Quotes: `"` → `\\"` and `'` → `\\'`
- Newlines: `\n` → `\\n`
- Tabs: `\t` → `\\t`
- Unicode separators: `\u2028` and `\u2029`

## Validation

The `validateBlogArchive` function ensures:
- Required fields are present and correct types
- Arrays are properly structured
- Post metadata is complete
- Author and tag data is valid

## Error Handling

- **Validation Errors**: Clear messages for data structure issues
- **File System Errors**: Detailed error reporting for write operations
- **Graceful Fallbacks**: Empty data generation if primary data fails
- **Build Safety**: Prevents Docusaurus build failures

## Testing

The utilities include comprehensive testing support:

```typescript
import { createSampleBlogArchive, testStringEscaping } from './blogDataGeneratorHelpers';

// Create test data
const sampleData = createSampleBlogArchive();

// Test string escaping edge cases
const escapeTests = testStringEscaping();
```

## Integration with Docusaurus

The plugin integrates with Docusaurus through:

1. **Content Loading**: Accesses blog plugin data during build
2. **Actions API**: Uses `actions.createData()` for file generation
3. **Build Lifecycle**: Generates files during content loading phase
4. **Type Safety**: Provides TypeScript interfaces for consuming components

## Example Usage in Components

```typescript
import { blogArchive } from '../generated';

export function BlogStats() {
  return (
    <div>
      <p>Total posts: {blogArchive.totalCount}</p>
      <p>Years: {blogArchive.years.length}</p>
      <p>Tags: {blogArchive.tags.length}</p>
    </div>
  );
}
```

## Development Notes

- Files are auto-generated with timestamps
- All generated files include "do not edit manually" warnings
- Empty data structures are provided as fallbacks
- The plugin supports both development and production builds
- File generation is atomic - either all files succeed or none are created

## Performance Considerations

- Generated files are created during build time, not runtime
- Static data means no database queries needed
- TypeScript interfaces provide compile-time optimization
- Files are optimized for tree-shaking and bundling