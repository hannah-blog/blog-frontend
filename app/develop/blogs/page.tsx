import Post from '@/components/post/post'
import InfiniteGrid from '@/components/utils/infinite-grid'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchBlogs } from '@/api/caller'

export async function generateMetadata() {
  return formatMetadata({
    title: "Develop Blog",
    description: "Hannah Develop Blog"
  });
}

export default async function Blog() {
  const posts = await fetchBlogs();

  return <div className="min-h-screen max-w-6xl mx-auto px-5 py-12 md:px-8 md:py-20">
    <div className="mb-10 md:mb-14">
      <h1 className="text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">Blog</h1>
      <p className="mt-2 text-surface-400">개발하며 배운 것들을 기록합니다.</p>
    </div>
    <InfiniteGrid columns={3}>
      {posts ? posts.map((post, idx) => (
        <Post key={idx} post={post} />
      )) : []}
    </InfiniteGrid>
  </div>;
}
