import { globby } from 'globby';

import fs from 'fs';
import prettier from 'prettier';

const today = new Date();

const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
const dateString = year + '-' + month + '-' + day;

const DOMAIN = 'https://www.hannah-log.site'

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const pages = await globby(['../public/sitemap/*.gz']);

  const sitemapIndex = `
    ${ pages
    .map(page => {
      const path = page.replace('../public/', '');
      return `
          <sitemap>
            <loc>${`${DOMAIN}/${path}`}</loc>
            <lastmod>${dateString}</lastmod>
          </sitemap>`;
    })
    .join('')}
  `;

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

  const formattedSitemap = new Buffer(await formatted(sitemap));

  fs.writeFileSync('../public/sitemap.xml', formattedSitemap, 'utf8');
})();
