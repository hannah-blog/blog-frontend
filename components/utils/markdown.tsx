'use client'

import '@/styles/app/blog/id/page.css'
import MarkdownPreview from '@uiw/react-markdown-preview'

export default function Markdown({ content }: { content: string }) {
  return <MarkdownPreview warpperElement={{ 'data-color-mode' : 'light' }} source={content} />;
}
