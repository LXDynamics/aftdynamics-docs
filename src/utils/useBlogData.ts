/**
 * React hook for consuming generated blog data
 * Provides a convenient interface for accessing blog archive data in components
 */

import { useMemo } from 'react';
import type { BlogArchive, BlogPost, BlogTag } from '../generated/types';

// Import the generated data
// This will be available after the plugin runs
let blogArchive: BlogArchive;
try {
  // Dynamic import to handle cases where data isn't generated yet
  blogArchive = require('../generated/data').blogArchive;
} catch (error) {
  // Fallback to empty data structure
  blogArchive = {
    posts: [],
    totalCount: 0,
    years: [],
    tags: []
  };
}

/**
 * Hook to access all blog data
 */
export function useBlogData(): BlogArchive {
  return useMemo(() => blogArchive, []);
}

/**
 * Hook to get blog posts with optional filtering
 */
export function useBlogPosts(filters?: {
  tag?: string;
  year?: string;
  limit?: number;
}): BlogPost[] {
  return useMemo(() => {
    let posts = blogArchive.posts;

    // Filter by tag
    if (filters?.tag) {
      posts = posts.filter(post => 
        post.metadata.tags.some(tag => tag.label === filters.tag)
      );
    }

    // Filter by year
    if (filters?.year) {
      posts = posts.filter(post => 
        post.metadata.date.startsWith(filters.year)
      );
    }

    // Apply limit
    if (filters?.limit && filters.limit > 0) {
      posts = posts.slice(0, filters.limit);
    }

    return posts;
  }, [filters]);
}

/**
 * Hook to get blog statistics
 */
export function useBlogStats() {
  return useMemo(() => ({
    totalPosts: blogArchive.totalCount,
    totalYears: blogArchive.years.length,
    totalTags: blogArchive.tags.length,
    latestPost: blogArchive.posts[0] || null,
    mostPopularTag: blogArchive.tags.reduce((prev, current) => 
      (prev.posts.length > current.posts.length) ? prev : current, 
      blogArchive.tags[0]
    )?.tag || null
  }), []);
}

/**
 * Hook to get posts by tag
 */
export function usePostsByTag(tagLabel: string): BlogPost[] {
  return useMemo(() => {
    const tagGroup = blogArchive.tags.find(t => t.tag.label === tagLabel);
    return tagGroup?.posts || [];
  }, [tagLabel]);
}

/**
 * Hook to get posts by year
 */
export function usePostsByYear(year: string): BlogPost[] {
  return useMemo(() => {
    const yearGroup = blogArchive.years.find(y => y.year === year);
    return yearGroup?.posts || [];
  }, [year]);
}

/**
 * Hook to get all available tags
 */
export function useBlogTags(): BlogTag[] {
  return useMemo(() => 
    blogArchive.tags.map(tagGroup => tagGroup.tag),
    []
  );
}

/**
 * Hook to get all available years
 */
export function useBlogYears(): string[] {
  return useMemo(() => 
    blogArchive.years.map(yearGroup => yearGroup.year),
    []
  );
}

/**
 * Hook to search posts by title or description
 */
export function useSearchPosts(searchTerm: string): BlogPost[] {
  return useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    const term = searchTerm.toLowerCase();
    return blogArchive.posts.filter(post => 
      post.metadata.title.toLowerCase().includes(term) ||
      (post.metadata.description && post.metadata.description.toLowerCase().includes(term))
    );
  }, [searchTerm]);
}

/**
 * Hook to get recent posts
 */
export function useRecentPosts(limit: number = 5): BlogPost[] {
  return useMemo(() => 
    blogArchive.posts.slice(0, limit),
    [limit]
  );
}