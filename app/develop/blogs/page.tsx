import Post from '@/components/post/post'
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

  return <div className="min-h-screen px-4 py-12 md:px-8 md:py-20">
    <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 md:mb-12">Develop Blog</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts && posts.map((post, idx) => {
        return <Post key={idx} post={post} />;
      })}
    </div>
  </div>;
}
