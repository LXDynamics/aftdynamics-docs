/**
 * Blog Data Plugin Integration
 * Demonstrates how to use the blog data generation utilities within a Docusaurus plugin
 */

import type { Plugin } from '@docusaurus/types';
import type { BlogArchive } from '../generated/types';
import {
  generateDataFileContent,
  generateTypesFileContent,
  generateIndexFileContent,
  validateBlogArchive,
  createEmptyBlogArchive,
  writeDataFile
} from './blogDataGenerator';

export interface BlogDataPluginOptions {
  /**
   * ID for the plugin instance
   */
  id?: string;
  
  /**
   * Whether to include empty data during development
   */
  includePlaceholderData?: boolean;
  
  /**
   * Custom blog data source (for testing)
   */
  customBlogData?: BlogArchive;
}

/**
 * Main plugin function that generates blog data files
 */
export function blogDataPlugin(
  context: any,
  options: BlogDataPluginOptions = {}
): Plugin<void> {
  const {
    id = 'blog-data',
    includePlaceholderData = false,
    customBlogData
  } = options;

  return {
    name: 'blog-data-plugin',
    
    async contentLoaded({ content, actions }) {
      try {
        let blogArchive: BlogArchive;
        
        // Use custom data if provided, otherwise create empty archive
        if (customBlogData) {
          validateBlogArchive(customBlogData);
          blogArchive = customBlogData;
        } else if (includePlaceholderData) {
          // In development, we might want to use placeholder data
          blogArchive = createPlaceholderBlogArchive();
        } else {
          // Extract blog data from Docusaurus blog plugin
          blogArchive = await extractBlogData(content);
        }

        // Generate and write all required files
        await generateBlogDataFiles(actions, blogArchive);
        
        console.log(`Blog data plugin: Generated files for ${blogArchive.totalCount} posts`);
        
      } catch (error) {
        console.error('Blog data plugin error:', error);
        
        // In case of error, generate empty files to prevent build failures
        const emptyArchive = createEmptyBlogArchive();
        await generateBlogDataFiles(actions, emptyArchive);
      }
    },

    async postBuild({ outDir }) {
      // Optional: Perform any post-build validation or cleanup
      console.log('Blog data plugin: Build completed');
    }
  };
}

/**
 * Generates all blog data files using Docusaurus actions
 */
async function generateBlogDataFiles(
  actions: any,
  blogArchive: BlogArchive
): Promise<void> {
  // Generate types file
  const typesContent = generateTypesFileContent();
  await writeDataFile(actions, 'blog-data-types.ts', typesContent);

  // Generate data file
  const dataContent = generateDataFileContent(blogArchive);
  await writeDataFile(actions, 'blog-data.ts', dataContent);

  // Generate index file
  const indexContent = generateIndexFileContent();
  await writeDataFile(actions, 'blog-data-index.ts', indexContent);
}

/**
 * Extracts blog data from Docusaurus content
 * This would integrate with the actual Docusaurus blog plugin data
 */
async function extractBlogData(content: any): Promise<BlogArchive> {
  // In a real implementation, this would:
  // 1. Access the blog plugin's content
  // 2. Transform it to our BlogArchive format
  // 3. Handle pagination, tags, authors, etc.
  
  // For now, return empty archive
  return createEmptyBlogArchive();
}

/**
 * Creates placeholder data for development
 */
function createPlaceholderBlogArchive(): BlogArchive {
  const samplePost = {
    id: 'placeholder-post',
    metadata: {
      permalink: '/blog/placeholder',
      title: 'Placeholder Blog Post',
      description: 'This is a placeholder post for development',
      date: '2024-01-01T00:00:00.000Z',
      formattedDate: 'January 1, 2024',
      tags: [
        {
          label: 'development',
          permalink: '/blog/tags/development'
        }
      ],
      readingTime: 2.5,
      authors: [
        {
          name: 'Developer',
          key: 'dev',
          title: 'Software Developer'
        }
      ]
    }
  };

  return {
    posts: [samplePost],
    totalCount: 1,
    years: [
      {
        year: '2024',
        posts: [samplePost]
      }
    ],
    tags: [
      {
        tag: {
          label: 'development',
          permalink: '/blog/tags/development'
        },
        posts: [samplePost]
      }
    ]
  };
}

/**
 * Plugin configuration helper
 */
export function createBlogDataPluginConfig(
  options: BlogDataPluginOptions = {}
): [string, BlogDataPluginOptions] {
  return ['./src/utils/blogDataPlugin', options];
}

/**
 * Type guard to check if content includes blog data
 */
export function isBlogContent(content: any): boolean {
  return content && 
         typeof content === 'object' && 
         Array.isArray(content.blogPosts);
}

/**
 * Utility to transform Docusaurus blog post to our format
 */
export function transformBlogPost(docusaurusBlogPost: any): any {
  // This would contain the actual transformation logic
  // to convert from Docusaurus internal format to our BlogPost interface
  return {
    id: docusaurusBlogPost.id,
    metadata: {
      permalink: docusaurusBlogPost.metadata.permalink,
      title: docusaurusBlogPost.metadata.title,
      description: docusaurusBlogPost.metadata.description,
      date: docusaurusBlogPost.metadata.date,
      formattedDate: docusaurusBlogPost.metadata.formattedDate,
      tags: docusaurusBlogPost.metadata.tags,
      readingTime: docusaurusBlogPost.metadata.readingTime,
      authors: docusaurusBlogPost.metadata.authors
    }
  };
}