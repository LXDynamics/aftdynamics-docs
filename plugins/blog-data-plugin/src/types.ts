/**
 * TypeScript definitions for AFT Dynamics Blog Data Plugin
 */

export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  date: string;
  formattedDate: string;
  tags: BlogTag[];
  permalink: string;
  editUrl?: string;
  readingTime?: number;
  truncated?: boolean;
  authors: BlogAuthor[];
  frontMatter: Record<string, any>;
}

export interface BlogTag {
  label: string;
  permalink: string;
  count?: number;
}

export interface BlogAuthor {
  name: string;
  title?: string;
  url?: string;
  imageURL?: string;
  email?: string;
}

export interface BlogMetadata {
  blogBasePath: string;
  blogTitle: string;
  blogDescription?: string;
  permalink: string;
  postsPerPage: number;
  totalPosts: number;
  totalPages: number;
}

export interface BlogData {
  posts: BlogPost[];
  tags: BlogTag[];
  recentPosts: BlogPost[];
  metadata: BlogMetadata;
}

export interface PluginOptions {
  blogDir?: string;
  routeBasePath?: string;
  postsPerPage?: number;
  includeReadingTime?: boolean;
  recentPostsCount?: number;
}

declare module '@docusaurus/useGlobalData' {
  interface GlobalData {
    'aftdynamics-blog-data-plugin': {
      blogData: BlogData;
      pluginVersion: string;
    };
  }
}