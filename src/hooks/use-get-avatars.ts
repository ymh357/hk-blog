import { graphql, useStaticQuery } from 'gatsby'

const getImageData = (nodes: Queries.AvatarQuery['allFile']['nodes'], author?: { avatar: string | null } | null) => {
  return nodes?.find((node) => {
    return node.base === author?.avatar
  })?.childImageSharp?.gatsbyImageData
}

export default function useGetAvatars() {
  const data = useStaticQuery<Queries.AvatarQuery>(graphql`
    query Avatar {
      site {
        siteMetadata {
          authors {
            avatar
            name
            path
          }
        }
      }
      allFile(filter: { relativeDirectory: { eq: "site-meta-data" } }) {
        nodes {
          base
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)
  const { authors } = data?.site?.siteMetadata || {}
  const { nodes } = data?.allFile

  return authors?.map((author) => ({
    name: author?.name,
    path: author?.path,
    imageData: getImageData(nodes, author),
  }))
}
