import React from 'react';
import Link from '@docusaurus/Link';
import { blogArchive } from '@site/src/generated/data';
import type { BlogPost } from '@site/src/generated/types';
import styles from './styles.module.css';

interface AuthorBlogPostsProps {
  authorId: string;
  maxPosts?: number;
  showTags?: boolean;
  showTagsOnly?: boolean;
}

export function AuthorBlogPosts({ authorId, maxPosts = 5, showTags = true, showTagsOnly = false }: AuthorBlogPostsProps) {
  // Filter posts by author
  const authorPosts = blogArchive.posts
    .filter(post => 
      post.metadata.authors.some(author => author.key === authorId)
    )
    .sort((a, b) => 
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    )
    .slice(0, maxPosts);

  if (authorPosts.length === 0) {
    return (
      <div className={styles.authorBlogSection}>
        <p>No blog posts by this author yet.</p>
      </div>
    );
  }

  // Extract and count all tags from author's posts
  if (showTagsOnly) {
    const tagCount: { [key: string]: { count: number; permalink: string } } = {};
    blogArchive.posts
      .filter(post => 
        post.metadata.authors.some(author => author.key === authorId)
      )
      .forEach(post => {
        post.metadata.tags.forEach(tag => {
          if (!tagCount[tag.label]) {
            tagCount[tag.label] = { count: 0, permalink: tag.permalink };
          }
          tagCount[tag.label].count++;
        });
      });

    const sortedTags = Object.entries(tagCount)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, maxPosts);

    return (
      <div className={styles.tagCloud}>
        {sortedTags.map(([label, { count, permalink }]) => (
          <Link 
            key={permalink}
            to={permalink} 
            className={styles.tagCloudItem} 
            data-count={count}
          >
            {label} ({count})
          </Link>
        ))}
      </div>
    );
  }

  // Show posts
  return (
    <div className={styles.authorBlogSection}>
      <div className={styles.blogPostsGrid}>
        {authorPosts.map(post => (
          <article key={post.id} className={styles.blogPostCard}>
            <h3 className={styles.postTitle}>
              <Link to={post.metadata.permalink}>
                {post.metadata.title}
              </Link>
            </h3>
            <div className={styles.postMeta}>
              <time dateTime={post.metadata.date}>
                {post.metadata.formattedDate}
              </time>
              <span className={styles.readingTime}>
                {Math.ceil(post.metadata.readingTime * 60)} min read
              </span>
            </div>
            {post.metadata.description && (
              <p className={styles.postDescription}>
                {post.metadata.description}
              </p>
            )}
            {showTags && post.metadata.tags.length > 0 && (
              <div className={styles.postTags}>
                {post.metadata.tags.map(tag => (
                  <Link key={tag.permalink} to={tag.permalink} className={styles.tag}>
                    {tag.label}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}