
import axios from 'axios';
import fs from 'fs';
import prettier from 'prettier';

const DOMAIN = 'https://www.hannah-log.site'

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

(async () => {
  let response = []

  await axios({
    method: 'get',
    url: 'https://api.hannah-log.site/blog',
  }).then((res) => {
    response = res.data.data
  })
  .catch((e) => {
    console.log(e.response.data)
  })

  const blogs = []
  response.forEach(blog => blogs.push({ id: blog.id, title: blog.title, createdDate: blog.createdDate }))

  const postListSitemap = `
  ${ blogs
    .map(post => {
      return `
        <url>
          <loc>${`${DOMAIN}/develop/blog/${post.id}`}</loc>
          <lastmod>${post.createdDate}</lastmod>
        </url>`
    })
    .join('')}
`

  const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${postListSitemap}
  </urlset>
`

  const formattedSitemap = new Buffer(await formatted(generatedSitemap));

  fs.writeFileSync('../public/sitemap/sitemap-posts.xml', formattedSitemap, 'utf8')
})()
