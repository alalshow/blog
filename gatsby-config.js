module.exports = {
  siteMetadata: {
    title: `alalshow Blog`,
    author: `BeomKwan Kim`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://www.blog.alalshow.com`,
    social: {
      twitter: `KimBeomKwan`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "@stackbit/gatsby-plugin-menus",
            options: {
              // static definition of menu items (optional)
              menus: {
                // identifier of menu container
                main: [
                  // array of contained children menu items
                  {
                    identifier: "myId", // identifier for this item (optional)
                    title: "Title for page",
                    url: "/",
                    weight: 1,
                  },
                ],
              },
              // Gatsby node types from which we extract menus (optional, see "Advanced usage")
              sourceNodeType: "MarkdownRemark",
              // the relative node path where we can find the 'menus' container (optional)
              sourceDataPath: "frontmatter",
              // the relative node path where we can find the page's URL (required)
              sourceUrlPath: "fields.url",
              // custom menu loading function (optional)
              //menuLoader: customLoaderFunction,
              // the property to use for injecting to the page context (optional, see "Advanced usage")
              pageContextProperty: "menus",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`, //목차 클릭 시 이동 시켜줌
          },
          {
            resolve: `gatsby-remark-table-of-contents`, // ```toc ``` 이런식으로 넣으면 목차 자동으로 만들어줌
            options: {
              exclude: "Table of Contents",
              tight: false,
              fromHeading: 1,
              toHeading: 6,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `alalshow Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
