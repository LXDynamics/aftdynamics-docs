import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AFT Dynamics',
  tagline: 'We make rocket engines',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://aftdynamics.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LXDynamics', // Usually your GitHub org/user name.
  projectName: 'aftdynamics-docs', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/LXDynamics/aftdynamics-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/LXDynamics/aftdynamics-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contact',
        path: 'contact',
        routeBasePath: 'contact',
        sidebarPath: './sidebarsContact.ts',
      },
    ],
    './plugins/blog-data-plugin',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.svg',
    navbar: {
      title: 'AFT',
      logo: {
        alt: 'AFT Dynamics Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'About',
        // },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'contactSidebar',
          docsPluginId: 'contact',
          position: 'left',
          label: 'The Team',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'About',
        //   items: [
        //     {
        //       label: 'AFT',
        //       to: '/docs/',
        //     },
        //     // {
        //     //   label: 'Business Model',
        //     //   to: '/docs/business/',
        //     // },
        //   ],
        // },
        {
          title: 'The Team',
          items: [
            {
              label: 'The Team',
              to: '/contact/',
            },
            // {
            //   label: 'Alexander Wright, PhD',
            //   to: '/contact/alexander-wright-phd',
            // },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/aftdynamics',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AFT Dynamics Pty. Ltd., Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
