// Unfortunately, Docusaurus doesn't provide a direct way to access all blog posts
// from any component. The blog plugin data is only available in specific contexts.
// This is a known limitation: https://github.com/facebook/docusaurus/issues/7229

// For now, we'll need to maintain this manually or create a custom plugin
// that generates this data at build time.

export interface BlogPost {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    description?: string;
    date: string;
    formattedDate: string;
    tags: Array<{
      label: string;
      permalink: string;
    }>;
    readingTime: number;
    authors: Array<{
      name: string;
      key: string;
      title?: string;
      url?: string;
      imageURL?: string;
    }>;
  };
}

// This data needs to be manually updated when blog posts change
// TODO: Create a build-time script to generate this automatically
export const blogPosts: BlogPost[] = [
  {
    id: "why-rocket-engines",
    metadata: {
      permalink: "/blog/why-rocket-engines",
      title: "Why Design and Build Rocket Engines?",
      description: "Lorem ipsum dolor sit amet...",
      date: "2025-07-09T00:00:00.000Z",
      formattedDate: "July 9, 2025",
      tags: [
        { label: "Rocket Engine", permalink: "/blog/tags/rocket-engine" },
        { label: "Space Exploration", permalink: "/blog/tags/space-exploration" }
      ],
      readingTime: 0.03,
      authors: [
        {
          name: "Alexander Wright",
          key: "awright",
          title: "PhD, Co-founder AFT Dynamics",
          url: "/contact/alexander-wright-phd",
          imageURL: "/img/alex-icon-2.jpg"
        }
      ]
    }
  }
];