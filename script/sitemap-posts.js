import fs from 'fs';
import prettier from 'prettier';

const DOMAIN = 'https://www.hannah-log.site'

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const response = await (await (fetch('https://api.hannah-log.site/blogs'))).json();

  const blogs = response.data;

  const postListSitemap = `
  ${ blogs
    .map(post => {
      return `
        <url>
          <loc>${`${DOMAIN}/develop/blogs/${post.id}`}</loc>
          <lastmod>${post.updatedDate}</lastmod>
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
