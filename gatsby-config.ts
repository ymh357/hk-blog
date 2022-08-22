import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'hk-blog',
    description: 'Personal tech blog for H and K. H mains front-end techonology whilst K focuses on data analysis.',
    authors: [
      {
        name: 'H',
        // avatar: 'https://www.gravatar.com/userimage/223753460/beb7a6e2969fd36c3ffec54b790fb67c',
        avatar: 'hao-avatar.jpeg',
        path: '/hao/',
        github: 'https://github.com/ymh357',
        email: 'ymhyzq@163.com',
        am: 'about myself here',
      },
      {
        name: 'K',
        avatar: 'kun-avatar.jpeg',
        path: '/kun/',
        // avatar: 'https://www.gravatar.com/userimage/223753460/5ccb74321ab78755b7c45816aa693144',
      },
    ],
    siteUrl: 'https://hk-blog-1xz78m05i-ymh357.vercel.app/',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            '**/*.{css,scss,less}',
            '**/*.{json,json5}',
            '**/*.{graphql}',
            '**/*.{md,mdx}',
            '**/*.{html}',
            '**/*.{yaml,yml}',
          ],
        },
        eslint: {
          patterns: '**/*.{js,jsx,ts,tsx}',
          customOptions: {
            fix: true,
            cache: true,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          Components: path.resolve(__dirname, 'src/components'),
          Demos: path.resolve(__dirname, 'src/demos'),
          Images: path.resolve(__dirname, 'src/images'),
          '@': path.resolve(__dirname, 'src/'),
        },
        extensions: [],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: path.join(__dirname, 'blog'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'hk blog',
        short_name: 'hk blog',
        start_url: '/',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
  ],
}

export default config
