import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  topic_title: string;
  topic_body: string;
  created_at?: string;
}

type RecentPostsMap = Record<string, Post | null>;

const HomeFeed: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<RecentPostsMap>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch categories on mount
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/api/category/categories', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError('Failed to load categories.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  // Fetch most recent post for each category
  useEffect(() => {
    if (categories.length === 0) return;

    const controller = new AbortController();

    const fetchRecentPosts = async () => {
      try {
        const posts: RecentPostsMap = {};
        await Promise.all(
          categories.map(async (cat) => {
            const res = await fetch(`http://localhost:3000/api/categories/${cat.id}/recent`, {
              signal: controller.signal,
            });
            if (!res.ok) throw new Error(`Failed to fetch post for ${cat.name}`);
            const data: Post = await res.json();
            posts[cat.name] = data || null;
          }),
        );
        setRecentPosts(posts);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('Failed to load recent posts:', err);
        }
      }
    };

    fetchRecentPosts();
    return () => controller.abort();
  }, [categories]);

  if (loading) {
    return (
      <div className='flex justify-center p-6'>
        <p className='text-gray-600 animate-pulse'>Loading feed...</p>
      </div>
    );
  }

  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-3xl'>
        <h2 className='text-center text-3xl font-bold mb-6 text-gray-900'>Home Feed</h2>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <div className='flex flex-col gap-4'>
          {categories.map((category) => {
            const post = recentPosts[category.name];

            return (
              <div
                key={category.id}
                className='bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all'
              >
                <div className='mb-2'>
                  <Link to={`/categories/${category.name}`} className='text-blue-600 font-medium hover:underline'>
                    {category.name}
                  </Link>
                </div>

                <div className='mt-2 border-t pt-3 text-gray-800'>
                  <h3 className='font-semibold text-xl mb-1'>{post?.topic_title || 'No posts yet'}</h3>
                  <p className='text-gray-700 text-sm leading-relaxed'>
                    {post?.topic_body ? (
                      post.topic_body
                    ) : (
                      <span className='italic text-gray-400'>No content available</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
