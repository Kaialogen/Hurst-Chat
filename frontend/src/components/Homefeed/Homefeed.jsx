import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Homefeed() {
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState({});
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch most recent post for each category
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const posts = {};
        await Promise.all(
          categories.map(async (cat) => {
            const res = await fetch(
              `http://localhost:3000/api/categories/${cat.id}/recent`
            );
            const data = await res.json();
            posts[cat.name] = data;
          })
        );
        setRecentPosts(posts);
      } catch (err) {
        console.error("Failed to load recent posts:", err);
      }
    };

    if (categories.length > 0) fetchRecentPosts();
  }, [categories]);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-center text-3xl font-bold mb-6">Home Feed</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-col gap-4">
          {categories.map((category) => {
            const post = recentPosts[category.name];

            return (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-md border border-gray-300 p-4 hover:shadow-lg transition"
              >
                <div className="mb-2">
                  <Link
                    to={`/categories/${category.name}`}
                    className="text-gray-800 hover:underline"
                  >
                    {category.name}
                  </Link>
                </div>

                <div className="mt-2 border-t pt-3 text-gray-800">
                  <h2 className="font-semibold text-xl mb-1">
                    {post?.topic_title || "No posts yet"}
                  </h2>
                  <p className="text-gray-700">
                    {post?.topic_body || (
                      <span className="italic text-gray-400">
                        No content available
                      </span>
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
}
