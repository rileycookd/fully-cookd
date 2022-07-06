import client, { previewClient } from './sanity'

export async function getAllBlogPosts() {
  const data = await client.fetch(
    `*[_type == "blog"] {
      ...,
    }`
  )
  return data
}

export async function getAllProjects() {
  const data = await client.fetch(
    `*[_type == "project"] {
      ...,
      client->,
      categories[]->,
    }`
  )
  return data
}

export async function getAllProjectsWithSlug() {
  const data = await client.fetch(`*[_type == "project"]{ 'slug': slug.current }`)
  return data
}

export async function getProjectBySlug(slug) {
  const data = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] { 
      ...,
      client->,
      categories[]->,
     }`, 
    { slug }
  )
  return data
}

export async function getPageById(id) {
  const data = await client.fetch(
    `*[_type == "page" && _id == $id][0] {
      ...,
      content[] {
        _type != 'testimonialsBlock' => @ { ... },
        _type == 'testimonialsBlock' => @ {
          ...,
          testimonials[]-> {
            ...,
            client->,
            contact->,
          }
        }
      }
    }`,
    { id }
  )
  return data
}
