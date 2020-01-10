const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const isIndex = name => name === `index` || name.indexOf("__index") !== -1

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions
    const fileNode =
      node.parent && node.parent !== "undefined" ? getNode(node.parent) : node
    const { dir = ``, name } = path.parse(fileNode.relativePath)
    let fileName = ``
    let priority = 1

    if (!isIndex(name)) {
      fileName = name.split("__")
      priority = parseInt(fileName[0], 10)
      fileName = fileName[fileName.length - 1]
    }

    createNodeField({
      node,
      name: `priority`,
      value: priority,
    })

    createNodeField({
      node,
      name: `slug`,
      value: path.posix.join(`/docs`, dir, fileName),
    })

    createNodeField({
      node,
      name: `category`,
      value: fileNode.relativeDirectory,
    })
  }
}
