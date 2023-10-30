import fs from 'fs';
import prettier from 'prettier';
import { navData } from '../data/module-nav-data.js';


const getDate = new Date().toISOString()
const DOMAIN = 'https://www.hannah-log.site'

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const pagesSitemap = `
  ${ navData.map((nav) => {
    return `
    <url>
      <loc>${DOMAIN}${nav.link}</loc>
      <lastmod>${getDate}</lastmod>
    </url>
    ${ nav.children.map((child) => {
      return `
      <url>
        <loc>${DOMAIN}${nav.link}${child.cLink}</loc>
        <lastmod>${getDate}</lastmod>
      </url>
      `;
    }).join('')}
  `;
    }).join('')}
  `;

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${pagesSitemap}
  </urlset>`;

  const formattedSitemap = new Buffer(await formatted(generatedSitemap));

  fs.writeFileSync('../public/sitemap/sitemap-common.xml', formattedSitemap, 'utf8')
})();
