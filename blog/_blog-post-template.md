---
slug: your-post-slug
title: Your Blog Post Title
authors: [awright]
tags: [tag1, tag2, tag3]
---

Your opening paragraph that will appear in the blog list and as the meta description. Keep this concise and engaging to hook readers.

<!-- truncate -->

## Introduction

Your main content starts here. The `<!-- truncate -->` comment above determines where the preview cuts off on the blog listing page.

## Main Content

Write your blog post content here using standard Markdown syntax.

### Subsections

You can use subsections to organize your content.

- Use bullet points
- To highlight key information
- In an easy-to-scan format

### Code Examples (if needed)

```javascript
// Code blocks are supported
const example = "Hello, World!";
console.log(example);
```

### Images (if needed)

You can include images from the static folder:

```markdown
![Alt text](../static/img/your-image.jpg)
```

Or from external sources:

```markdown
![Alt text](https://example.com/image.jpg)
```

## Conclusion

Wrap up your post with a conclusion that summarizes the key points or provides a call to action.

---

## Template Usage Instructions

1. **Copy this template** to create a new blog post
2. **Rename the file** using the format: `YYYY-MM-DD-descriptive-name.md`
3. **Update the frontmatter**:
   - `slug`: URL-friendly version of your title (used in the URL)
   - `title`: The display title of your blog post
   - `authors`: Array of author keys from `blog/authors.yml` (currently just `awright`)
   - `tags`: Array of tags for categorization (keep them concise and relevant)
4. **Write your content** below the frontmatter
5. **Place the `<!-- truncate -->` comment** where you want the preview to end
6. **Save the file** in the `blog/` directory

### Frontmatter Field Reference

- **slug** (required): Controls the URL path (`/blog/your-post-slug`)
- **title** (required): Display title shown everywhere
- **authors** (required): Must match keys in `blog/authors.yml`
- **tags** (optional): For categorization and filtering
- **date** (optional): If not specified, uses filename date

### File Naming Convention

Use this format: `YYYY-MM-DD-descriptive-name.md`

Examples:
- `2025-07-15-new-engine-design.md`
- `2025-08-01-testing-results.md`
- `2025-09-10-company-milestone.md`

The date in the filename will be used as the publication date unless you specify a different date in the frontmatter.

### Tag Suggestions

Based on your existing posts, here are some tag ideas:
- Technical: `rocket-engine`, `space-exploration`, `engineering`, `design`, `testing`
- Company: `AFT`, `company`, `milestone`, `team`, `news`
- Industry: `aerospace`, `startup`, `innovation`, `research`
- Content type: `tutorial`, `announcement`, `analysis`, `review`

Keep tags consistent across posts to help with navigation and filtering.