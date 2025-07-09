import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface BlogPost {
  id: string;
  metadata: {
    title: string;
    date: string;
    formattedDate: string;
    authors: Array<{
      name: string;
      key: string;
    }>;
    tags: Array<{
      label: string;
      permalink: string;
    }>;
    readingTime: number;
    truncated: boolean;
    permalink: string;
    description?: string;
  };
}

interface AuthorBlogPostsProps {
  authorId: string;
  maxPosts?: number;
  showTags?: boolean;
  showPostsOnly?: boolean;
  showTagsOnly?: boolean;
}

export function AuthorBlogPosts({ showTags = true, showPostsOnly = true, showTagsOnly = false }: AuthorBlogPostsProps) {
  // For now, let's create a static display to verify the component is working
  // We'll update this once we figure out the correct way to access blog data
  
  // Show only tags
  if (showTagsOnly) {
    return (
      <div className={styles.tagCloud}>
        <Link to="/blog/tags/rocket-engine" className={styles.tagCloudItem} data-count="1">
          Rocket Engine (1)
        </Link>
        <Link to="/blog/tags/space-exploration" className={styles.tagCloudItem} data-count="1">
          Space Exploration (1)
        </Link>
      </div>
    );
  }

  // Show only posts (default behavior)
  return (
    <div className={styles.authorBlogSection}>
      <div className={styles.blogPostsGrid}>
        <article className={styles.blogPostCard}>
          <h3 className={styles.postTitle}>
            <Link to="/blog/2025-07-09-first-blog-post">
              Welcome to AFT Dynamics Blog
            </Link>
          </h3>
          <div className={styles.postMeta}>
            <time dateTime="2025-07-09">
              July 9, 2025
            </time>
            <span className={styles.readingTime}>
              5 min read
            </span>
          </div>
          <p className={styles.postDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          {showTags && (
            <div className={styles.postTags}>
              <Link to="/blog/tags/rocket-engine" className={styles.tag}>
                Rocket Engine
              </Link>
              <Link to="/blog/tags/space-exploration" className={styles.tag}>
                Space Exploration
              </Link>
            </div>
          )}
        </article>
      </div>
    </div>
  );
  
  // Original dynamic code - keeping for reference
  /*
  const blogPluginData = usePluginData('docusaurus-plugin-content-blog') as any;
  
  if (!blogPluginData || !blogPluginData.blogPosts) {
    return (
      <div className={styles.authorBlogSection}>
        <h2>Recent Blog Posts</h2>
        <p>Blog posts will appear here once published.</p>
      </div>
    );
  }

  // Filter posts by author
  const authorPosts = blogPluginData.blogPosts
    .filter((post: BlogPost) => 
      post.metadata.authors.some(author => author.key === authorId)
    )
    .sort((a: BlogPost, b: BlogPost) => 
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    )
    .slice(0, maxPosts);

  if (authorPosts.length === 0) {
    return (
      <div className={styles.authorBlogSection}>
        <h2>Recent Blog Posts</h2>
        <p>No blog posts by this author yet.</p>
      </div>
    );
  }
  */
}