import Link from 'next/link'
import Image from 'next/image'
import { Post as PostType } from '@/api/caller'
import { Chip } from '@/components/tailwind/client-components'
import { dateFormat } from '@/components/utils/dateUtils'

export default function Post({ post }: { post: PostType }) {
  return (
    <Link href={`/develop/blogs/${post.id}`}>
      <article className="group bg-white rounded-2xl overflow-hidden shadow-sm shadow-surface-200/50 hover:shadow-xl hover:shadow-surface-200/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-surface-100">
        <div className="relative aspect-[16/10] bg-surface-100 overflow-hidden">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-surface-800 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
            {post.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <Chip key={idx} size="sm" value={`#${tag.name}`} />
            ))}
          </div>
          <time className="block mt-3 text-xs text-surface-400">{dateFormat(post.createdDate)}</time>
        </div>
      </article>
    </Link>
  );
}
