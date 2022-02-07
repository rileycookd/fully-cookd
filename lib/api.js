import client, { previewClient } from './sanity'

export async function getPageBlocks(id) {
  const data = await client.fetch(
    `*[_type == "page" || _type == "homepage" && _id == $id ][0] { 
      content[] {
        _type != 'classTypesList' && _type != 'testimonialGroup' => @ { ... },
        _type == 'classTypesList' => @ {
          ...,
          classTypes[]->
        },
        _type == 'testimonialGroup' => @ {
          ...,
          testimonials[]-> {
            ...,
            student->
          }
        }
      }
    }`,
    { id }
  )
  const content = data?.content
  return content
}

export async function getPageFooter(id) {
  const data = await client.fetch(
    `*[_type == "siteSettings"][0] { 
      "footer": defaultFooter->
    }`,
    { id }
  )
  const { footer } = data
  return footer
}

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllClassTypesWithSlug() {
  const data = await client.fetch(`*[_type == "classType"]{ 'slug': slug.current }`)
  return data
}

export async function getClassTypeBySlug(slug) {
  const data = await client.fetch(
    `*[_type == "classType" && slug.current == $slug][0] { ... }`, 
    { slug }
  )
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" && 
                      post._ref == ^._id && 
                      approved == true] {
          _id, 
          name, 
          email, 
          comment, 
          _createdAt
        }
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}
