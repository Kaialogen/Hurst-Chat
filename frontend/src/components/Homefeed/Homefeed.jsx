import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Homefeed() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  const getMostRecentTopic = (topics) => {
    if (!topics || topics.length === 0) return null;

    return topics.reduce((latest, topic) =>
      new Date(topic.created_at) > new Date(latest.created_at) ? topic : latest
    );
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-center text-3xl font-bold mb-6">Home Feed</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-col gap-4">
          {categories.length > 0 ? (
            categories.map((category) => {
              const recentTopic = getMostRecentTopic(category.topics);

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
                    <h2 className="font-semibold text-xl mb-1">Post Title</h2>
                    {recentTopic ? (
                      <p>{recentTopic.topic_content}</p>
                    ) : (
                      <p className="text-gray-400 italic">Post Content</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              No categories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
