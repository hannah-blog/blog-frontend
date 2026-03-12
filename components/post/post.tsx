import Link from 'next/link'
import Image from 'next/image'
import { Post as PostType } from '@/api/caller'
import { Chip } from '@/components/tailwind/client-components'
import { dateFormat } from '@/components/utils/dateUtils'

export default function Post({ post }: { post: PostType }) {
  return (
    <Link href={`/develop/blogs/${post.id}`}>
      <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="relative h-56 bg-indigo-100">
          <Image
            src={post.thumbnailUrl}
            alt="thumbnail-url"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 text-center font-medium text-slate-800">{post.title}</div>
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, idx) => (
              <Chip key={idx} size="sm" className="font-medium" value={`#${tag.name}`} />
            ))}
          </div>
          <div className="text-sm text-slate-500">{dateFormat(post.createdDate)}</div>
        </div>
      </div>
    </Link>
  );
}
