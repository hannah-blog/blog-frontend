import fs from 'fs';

const generatedSitemap = `
User-agent: *
Allow: /
Disallow: /private
Host: https://www.hannah-log.site
`

fs.writeFileSync('../public/robots.txt', generatedSitemap, 'utf8')
