import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

interface Post {
  id: number;
  topic_id: number;
  topic_title: string;
  topic_body: string;
  created_at?: string;
}

export default function CategoriesPage() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categoryName) return;

    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3000/api/categories/${encodeURIComponent(categoryName)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts for ${categoryName}`);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching posts:', err);
          setError('Failed to load posts.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    return () => controller.abort();
  }, [categoryName]);

  if (loading) {
    return (
      <div className='flex justify-center p-6'>
        <p className='text-gray-600 animate-pulse'>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-3xl'>
        <h2 className='text-center text-3xl font-bold mb-6 text-gray-900'>Posts in {categoryName}</h2>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <table className='border border-black border-collapse w-full bg-[#f5f5ff]'>
          <thead>
            <tr>
              <th className='bg-[#ee6cfa] text-[#010110] text-center p-2 w-[70%]'>Post</th>
              <th className='bg-[#ee6cfa] text-[#010110] text-center p-2 w-[30%]'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.topic_id}>
                  <td className='p-3 align-top'>
                    <h3 className='font-semibold text-gray-900 mb-1'>
                      <a
                        href={`/src/topics.html?id=${post.topic_id}`}
                        className='text-blue-700 underline hover:text-blue-900'
                      >
                        {post.topic_title}
                      </a>
                    </h3>
                    <p className='text-gray-700 text-sm'>{post.topic_body.slice(0, 120)}...</p>
                  </td>
                  <td className='p-3 text-sm text-gray-600 text-center'>
                    {post.created_at ? new Date(post.created_at).toLocaleString() : '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className='text-center p-4'>
                  No posts available in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
