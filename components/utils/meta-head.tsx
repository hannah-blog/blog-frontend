import Head from 'next/head'

interface HeadMeta {
  title?: string | null;
  description?: string | null;
  url?: string | null;
  image?: string | null;
  tags?: string[] | null;
}

export default function HeadMeta({ title, description, url, image, tags }: HeadMeta) {
  const defaultImage = "https://avatars.githubusercontent.com/u/57277976?v=4";
  const defaultUrl = "https://www.hannah-log.site";
  const defaultDescription = "Hannah Blog";

  return <>
    <Head>
      <title>{ title ? `${title} | Hannah` : "Archiving for Hannah" }</title>
      <meta name="description" content={ description ? parseMarkdown(description) : defaultDescription } />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="author" content={ tags ? tags.toString() : '' } />

      <meta property="og:title" content={title ? `${title} | Hannah` : "Archiving for Hannah"} />
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={url ? url : defaultUrl} />
      <meta property="og:image" content={image ? image : defaultImage} />
      <meta property="og:article:author" content="hannah"/>

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ title ? `${title} | Hannah` : defaultDescription } data-rf="true" />
      <meta name="twitter:description" content={description ? parseMarkdown(description) : "Hannah Blog"} />
      <meta name="twitter:site" content={`@${defaultUrl}`} />
      <meta name="twitter:image" content={image ? image : defaultImage} />
    </Head>
  </>;
}

function parseMarkdown(markdownText: string) {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '')
    .replace(/^## (.*$)/gim, '')
    .replace(/^# (.*$)/gim, '')
    .replace(/^> (.*$)/gim, '')
    .replace(/\*\*(.*)\*\*/gim, '')
    .replace(/\*(.*)\*/gim, '')
    .replace(/!\[(.*?)]\((.*?)\)/gim, '')
    .replace(/\[(.*?)]\((.*?)\)/gim, '')
    .replace(/\n$/gim, '')

  return htmlText.trim()
}