interface MetaParamsType {
  title?: string | null;
  description?: string | null;
  url?: string | null;
  image?: string | null;
  tags?: string[] | null;
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

export type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export function formatMetadata({ title, description, url, image, tags }: MetaParamsType) {
  return {
    title: title ? `${title} | Hannah` : "Archiving for Hannah",
    description: description ? parseMarkdown(description) : "Hannah Blog",
    url: url ? url : "https://www.hannah-log.site",
    image: image ? image : "https://avatars.githubusercontent.com/u/57277976?v=4",
    tags: tags ? tags.toString() : '',
    type: 'website',
  }
}
