'use client'

import MarkdownPreview from '@uiw/react-markdown-preview'

export default function Markdown({ content }) {
  return <MarkdownPreview source={content} />;
}
