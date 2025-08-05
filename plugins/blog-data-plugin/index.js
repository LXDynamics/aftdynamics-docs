const path = require("path");
const fs = require("fs");

/**
 * AFTdynamics Blog Data Plugin for Docusaurus
 *
 * This plugin provides blog metadata as global data that can be accessed
 * throughout the Docusaurus site for features like recent posts, tags, etc.
 */
function blogDataPlugin(context, options) {
  const logger = context.logger || console;

  return {
    name: "aftdynamics-blog-data-plugin",

    async loadContent() {
      // This plugin doesn't load its own content, it processes blog plugin data
      // The actual content loading happens in allContentLoaded hook
      return null;
    },

    async allContentLoaded({ allContent, actions }) {
      const { setGlobalData } = actions;

      try {
        // Access blog plugin data
        const blogContent =
          allContent["docusaurus-plugin-content-blog"]?.["default"];

        if (!blogContent) {
          logger.warn(
            "[blog-data-plugin] Blog plugin content not found. Ensure @docusaurus/plugin-content-blog is enabled."
          );
          setGlobalData({
            blogData: {
              posts: [],
              totalCount: 0,
              years: [],
              tags: [],
            },
            pluginVersion: "1.0.0",
            error: "Blog plugin not found",
          });
          return;
        }

        // Extract blog posts from blog plugin data
        const blogPosts = blogContent.blogPosts || [];

        if (blogPosts.length === 0) {
          logger.info("[blog-data-plugin] No blog posts found.");
          setGlobalData({
            blogData: {
              posts: [],
              totalCount: 0,
              years: [],
              tags: [],
            },
            pluginVersion: "1.0.0",
          });
          return;
        }

        // Process blog posts and extract metadata
        const processedPosts = blogPosts.map((post) => {
          const metadata = post.metadata || {};

          // Format date as "weekday, day month year"
          const dateObj = new Date(metadata.date || new Date().toISOString());
          const formattedDate = dateObj.toLocaleDateString("en-AU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return {
            id: post.id || metadata.permalink || "unknown",
            metadata: {
              permalink: metadata.permalink || "",
              title: metadata.title || "Untitled",
              description: metadata.description || "",
              date: metadata.date || new Date().toISOString(),
              formattedDate: formattedDate,
              tags: (metadata.tags || []).map((tag) => ({
                label: tag.label || tag.name || "Unknown Tag",
                permalink: tag.permalink || "#",
              })),
              readingTime: metadata.readingTime || 0,
              authors: (metadata.authors || []).map((author) => ({
                name: author.name || "Unknown Author",
                key:
                  author.key ||
                  author.name?.toLowerCase().replace(/\s+/g, "-") ||
                  "unknown",
                title: author.title,
                url: author.url,
                imageURL: author.imageURL,
              })),
            },
          };
        });

        // Sort posts by date (newest first)
        const sortedPosts = processedPosts.sort((a, b) => {
          const dateA = new Date(a.metadata.date);
          const dateB = new Date(b.metadata.date);
          return dateB.getTime() - dateA.getTime();
        });

        // Group posts by year
        const postsByYear = {};
        sortedPosts.forEach((post) => {
          const year = new Date(post.metadata.date).getFullYear().toString();
          if (!postsByYear[year]) {
            postsByYear[year] = [];
          }
          postsByYear[year].push(post);
        });

        const years = Object.keys(postsByYear)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((year) => ({
            year,
            posts: postsByYear[year],
          }));

        // Group posts by tags
        const postsByTag = {};
        sortedPosts.forEach((post) => {
          post.metadata.tags.forEach((tag) => {
            const tagKey = tag.label;
            if (!postsByTag[tagKey]) {
              postsByTag[tagKey] = {
                tag,
                posts: [],
              };
            }
            postsByTag[tagKey].posts.push(post);
          });
        });

        const tags = Object.values(postsByTag).sort(
          (a, b) => b.posts.length - a.posts.length
        );

        // Prepare final blog data
        const blogData = {
          posts: sortedPosts,
          totalCount: sortedPosts.length,
          years,
          tags,
        };

        logger.info(
          `[blog-data-plugin] Processed ${blogData.totalCount} blog posts with ${tags.length} unique tags.`
        );

        // Generate TypeScript file
        await generateBlogDataFile(blogData, context);

        // Set global data that can be accessed via useGlobalData hook
        setGlobalData({
          blogData,
          pluginVersion: "1.0.0",
        });
      } catch (error) {
        logger.error("[blog-data-plugin] Error processing blog data:", error);

        // Generate empty file even on error
        const fallbackData = {
          posts: [],
          totalCount: 0,
          years: [],
          tags: [],
        };
        await generateBlogDataFile(fallbackData, context);

        // Set fallback data in case of error
        setGlobalData({
          blogData: fallbackData,
          pluginVersion: "1.0.0",
          error: error.message,
        });
      }
    },

    getPathsToWatch() {
      // Return paths that should trigger plugin reload during development
      return [path.join(context.siteDir, "blog/**/*.{md,mdx}")];
    },

    configureWebpack(config, isServer, utils) {
      // Webpack configuration if needed
      return {};
    },
  };
}

/**
 * Generate TypeScript data file
 */
async function generateBlogDataFile(blogData, context) {
  const generatedDir = path.join(context.siteDir, "src", "generated");
  const dataFile = path.join(generatedDir, "data.ts");

  // Ensure generated directory exists
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  // Helper function to escape strings for TypeScript
  function escapeString(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
  }

  // Generate TypeScript content
  const fileContent = `/**
 * Generated blog data
 * This file is generated by the blog data plugin - do not edit manually
 * Generated at: ${new Date().toISOString()}
 */

import type { BlogArchive } from './types';

export const blogArchive: BlogArchive = {
  posts: [${blogData.posts
    .map(
      (post) => `
    {
      id: '${escapeString(post.id)}',
      metadata: {
        permalink: '${escapeString(post.metadata.permalink)}',
        title: '${escapeString(post.metadata.title)}',
        description: '${escapeString(post.metadata.description)}',
        date: '${escapeString(post.metadata.date)}',
        formattedDate: '${escapeString(post.metadata.formattedDate)}',
        tags: [${post.metadata.tags
          .map(
            (tag) => `
          {
            label: '${escapeString(tag.label)}',
            permalink: '${escapeString(tag.permalink)}'
          }`
          )
          .join(",")}
        ],
        readingTime: ${post.metadata.readingTime},
        authors: [${post.metadata.authors
          .map(
            (author) => `
          {
            name: '${escapeString(author.name)}',
            key: '${escapeString(author.key)}',${
              author.title
                ? `
            title: '${escapeString(author.title)}',`
                : ""
            }${
              author.url
                ? `
            url: '${escapeString(author.url)}',`
                : ""
            }${
              author.imageURL
                ? `
            imageURL: '${escapeString(author.imageURL)}',`
                : ""
            }
          }`
          )
          .join(",")}
        ]
      }
    }`
    )
    .join(",")}
  ],
  totalCount: ${blogData.totalCount},
  years: [${blogData.years
    .map(
      (year) => `
    {
      year: '${escapeString(year.year)}',
      posts: [] // Posts are included in the main posts array
    }`
    )
    .join(",")}
  ],
  tags: [${blogData.tags
    .map(
      (tag) => `
    {
      tag: {
        label: '${escapeString(tag.tag.label)}',
        permalink: '${escapeString(tag.tag.permalink)}'
      },
      posts: [] // Posts are included in the main posts array
    }`
    )
    .join(",")}
  ]
};
`;

  // Write the file
  fs.writeFileSync(dataFile, fileContent, "utf8");
}

module.exports = blogDataPlugin;
