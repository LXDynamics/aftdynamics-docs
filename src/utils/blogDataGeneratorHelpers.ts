/**
 * Helper utilities for the blog data generator
 * Provides additional functionality for file system operations and testing
 */

import * as fs from "fs";
import * as path from "path";
import type { BlogArchive } from "../generated/types";
import {
  generateDataFileContent,
  generateTypesFileContent,
  generateIndexFileContent,
  validateBlogArchive,
  createEmptyBlogArchive,
} from "./blogDataGenerator";

/**
 * File system-based writer for when Docusaurus actions are not available
 * This is useful for testing or standalone usage
 */
export async function writeFileSystemFile(
  filePath: string,
  content: string
): Promise<void> {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write file
    fs.writeFileSync(filePath, content, "utf-8");
  } catch (error) {
    throw new Error(`Failed to write file ${filePath}: ${error}`);
  }
}

/**
 * Generates all required files in the generated directory
 */
export async function generateAllFiles(
  generatedDir: string,
  blogArchive: BlogArchive,
  useFileSystem: boolean = false,
  actions?: any
): Promise<void> {
  // Validate the blog archive data
  validateBlogArchive(blogArchive);

  const files = {
    "types.ts": generateTypesFileContent(),
    "data.ts": generateDataFileContent(blogArchive),
    "index.ts": generateIndexFileContent(),
  };

  for (const [filename, content] of Object.entries(files)) {
    if (useFileSystem) {
      const filePath = path.join(generatedDir, filename);
      await writeFileSystemFile(filePath, content);
    } else if (actions) {
      await actions.createData(filename, content);
    } else {
      throw new Error(
        "Either useFileSystem must be true or actions must be provided"
      );
    }
  }
}

/**
 * Creates a sample blog archive for testing purposes
 */
export function createSampleBlogArchive(): BlogArchive {
  return {
    posts: [
      {
        id: "welcome-post",
        metadata: {
          permalink: "/blog/welcome",
          title: "Welcome to AFTdynamics",
          description:
            "Introducing our revolutionary rocket engine cluster technology",
          date: "2024-01-15T00:00:00.000Z",
          formattedDate: "January 15, 2024",
          tags: [
            {
              label: "announcement",
              permalink: "/blog/tags/announcement",
            },
            {
              label: "rocket-engines",
              permalink: "/blog/tags/rocket-engines",
            },
          ],
          readingTime: 3.5,
          authors: [
            {
              name: "Dr. Alexander Wright",
              key: "alexander-wright",
              title: "Chief Technology Officer",
              url: "https://linkedin.com/in/alexjwright",
              imageURL: "/img/team/alex-wright.jpg",
            },
          ],
        },
      },
      {
        id: "technical-overview",
        metadata: {
          permalink: "/blog/technical-overview",
          title: "Technical Overview: Engine Cluster Architecture",
          description:
            "Deep dive into our innovative engine cluster design and turbogenerator technology",
          date: "2024-02-10T00:00:00.000Z",
          formattedDate: "February 10, 2024",
          tags: [
            {
              label: "technical",
              permalink: "/blog/tags/technical",
            },
            {
              label: "rocket-engines",
              permalink: "/blog/tags/rocket-engines",
            },
            {
              label: "turbogenerator",
              permalink: "/blog/tags/turbogenerator",
            },
          ],
          readingTime: 8.2,
          authors: [
            {
              name: "Dr. Alexander Wright",
              key: "alexander-wright",
              title: "Chief Technology Officer",
              url: "https://linkedin.com/in/alexjwright",
              imageURL: "/img/team/alex-wright.jpg",
            },
          ],
        },
      },
    ],
    totalCount: 2,
    years: [
      {
        year: "2024",
        posts: [
          {
            id: "welcome-post",
            metadata: {
              permalink: "/blog/welcome",
              title: "Welcome to AFTdynamics",
              description:
                "Introducing our revolutionary rocket engine cluster technology",
              date: "2024-01-15T00:00:00.000Z",
              formattedDate: "January 15, 2024",
              tags: [
                {
                  label: "announcement",
                  permalink: "/blog/tags/announcement",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
              ],
              readingTime: 3.5,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
          {
            id: "technical-overview",
            metadata: {
              permalink: "/blog/technical-overview",
              title: "Technical Overview: Engine Cluster Architecture",
              description:
                "Deep dive into our innovative engine cluster design and turbogenerator technology",
              date: "2024-02-10T00:00:00.000Z",
              formattedDate: "February 10, 2024",
              tags: [
                {
                  label: "technical",
                  permalink: "/blog/tags/technical",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
                {
                  label: "turbogenerator",
                  permalink: "/blog/tags/turbogenerator",
                },
              ],
              readingTime: 8.2,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
        ],
      },
    ],
    tags: [
      {
        tag: {
          label: "announcement",
          permalink: "/blog/tags/announcement",
        },
        posts: [
          {
            id: "welcome-post",
            metadata: {
              permalink: "/blog/welcome",
              title: "Welcome to AFTdynamics",
              description:
                "Introducing our revolutionary rocket engine cluster technology",
              date: "2024-01-15T00:00:00.000Z",
              formattedDate: "January 15, 2024",
              tags: [
                {
                  label: "announcement",
                  permalink: "/blog/tags/announcement",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
              ],
              readingTime: 3.5,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
        ],
      },
      {
        tag: {
          label: "rocket-engines",
          permalink: "/blog/tags/rocket-engines",
        },
        posts: [
          {
            id: "welcome-post",
            metadata: {
              permalink: "/blog/welcome",
              title: "Welcome to AFTdynamics",
              description:
                "Introducing our revolutionary rocket engine cluster technology",
              date: "2024-01-15T00:00:00.000Z",
              formattedDate: "January 15, 2024",
              tags: [
                {
                  label: "announcement",
                  permalink: "/blog/tags/announcement",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
              ],
              readingTime: 3.5,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
          {
            id: "technical-overview",
            metadata: {
              permalink: "/blog/technical-overview",
              title: "Technical Overview: Engine Cluster Architecture",
              description:
                "Deep dive into our innovative engine cluster design and turbogenerator technology",
              date: "2024-02-10T00:00:00.000Z",
              formattedDate: "February 10, 2024",
              tags: [
                {
                  label: "technical",
                  permalink: "/blog/tags/technical",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
                {
                  label: "turbogenerator",
                  permalink: "/blog/tags/turbogenerator",
                },
              ],
              readingTime: 8.2,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
        ],
      },
      {
        tag: {
          label: "technical",
          permalink: "/blog/tags/technical",
        },
        posts: [
          {
            id: "technical-overview",
            metadata: {
              permalink: "/blog/technical-overview",
              title: "Technical Overview: Engine Cluster Architecture",
              description:
                "Deep dive into our innovative engine cluster design and turbogenerator technology",
              date: "2024-02-10T00:00:00.000Z",
              formattedDate: "February 10, 2024",
              tags: [
                {
                  label: "technical",
                  permalink: "/blog/tags/technical",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
                {
                  label: "turbogenerator",
                  permalink: "/blog/tags/turbogenerator",
                },
              ],
              readingTime: 8.2,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
        ],
      },
      {
        tag: {
          label: "turbogenerator",
          permalink: "/blog/tags/turbogenerator",
        },
        posts: [
          {
            id: "technical-overview",
            metadata: {
              permalink: "/blog/technical-overview",
              title: "Technical Overview: Engine Cluster Architecture",
              description:
                "Deep dive into our innovative engine cluster design and turbogenerator technology",
              date: "2024-02-10T00:00:00.000Z",
              formattedDate: "February 10, 2024",
              tags: [
                {
                  label: "technical",
                  permalink: "/blog/tags/technical",
                },
                {
                  label: "rocket-engines",
                  permalink: "/blog/tags/rocket-engines",
                },
                {
                  label: "turbogenerator",
                  permalink: "/blog/tags/turbogenerator",
                },
              ],
              readingTime: 8.2,
              authors: [
                {
                  name: "Dr. Alexander Wright",
                  key: "alexander-wright",
                  title: "Chief Technology Officer",
                  url: "https://linkedin.com/in/alexjwright",
                  imageURL: "/img/team/alex-wright.jpg",
                },
              ],
            },
          },
        ],
      },
    ],
  };
}

/**
 * Reads and validates an existing data.ts file
 */
export function readAndValidateDataFile(filePath: string): BlogArchive {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, "utf-8");

    // Basic validation that it looks like a TypeScript file
    if (!content.includes("export const blogArchive")) {
      throw new Error("File does not contain expected export");
    }

    if (!content.includes("import type { BlogArchive }")) {
      throw new Error("File does not contain expected import");
    }

    return createEmptyBlogArchive(); // For now, return empty - actual validation would require evaluation
  } catch (error) {
    throw new Error(`Failed to read and validate data file: ${error}`);
  }
}

/**
 * Utility to test string escaping with edge cases
 */
export function testStringEscaping(): { input: string; expected: string }[] {
  return [
    {
      input: "Simple string",
      expected: "Simple string",
    },
    {
      input: 'String with "quotes"',
      expected: 'String with \\"quotes\\"',
    },
    {
      input: "String with 'single quotes'",
      expected: "String with \\'single quotes\\'",
    },
    {
      input: "String with\nnewlines",
      expected: "String with\\nnewlines",
    },
    {
      input: "String with\ttabs",
      expected: "String with\\ttabs",
    },
    {
      input: "String with\\backslashes",
      expected: "String with\\\\backslashes",
    },
    {
      input: "String with \u2028 line separator",
      expected: "String with \\u2028 line separator",
    },
    {
      input: "String with \u2029 paragraph separator",
      expected: "String with \\u2029 paragraph separator",
    },
  ];
}
