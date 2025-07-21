import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import LogoBanner from "../components/LogoBanner/LogoBanner";

export default function CategoriesPage() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/categories/${categoryName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data = await response.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      }
    };

    fetchPosts();
  }, [categoryName]);
  return (
    <div className="bg-[#f5f5ff] text-center">
      <Navbar />
      <LogoBanner />
      <div id="wrapper" className="flex flex-col items-center">
        <div
          id="content"
          className="bg-[#2215f7] rounded-[20px] font-sans px-[30px] py-[20px] text-left w-[900px] float-left shadow-lg"
        >
          <h2
            id="category_name"
            className="text-center text-white text-2xl p-6"
          >
            Posts in {categoryName}
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <table className="border border-black border-collapse w-full bg-[#f5f5ff]">
            <thead>
              <tr>
                <th className="bg-[#ee6cfa] text-[#010110] text-center p-2 w-[7/10]">
                  Post
                </th>
                <th className="bg-[#ee6cfa] text-[#010110] text-center p-2 w-[3/10]">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.topic_id}>
                    <td className="leftpart">
                      <h3 id="topic_name">
                        <a
                          href={`/src/topics.html?id=${post.topic_id}`}
                          className="text-black underline hover:text-gray-800"
                        >
                          {post.topic_content}
                        </a>
                      </h3>
                    </td>
                    <td className="rightpart">
                      {new Date(post.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-4">
                    No posts available in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
