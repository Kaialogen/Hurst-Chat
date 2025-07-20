import { useEffect, useState } from "react";

export default function Categories() {
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

  const getMostRecentTopicContent = (topics) => {
    if (!topics || topics.length === 0) return "No topics yet";

    const mostRecent = topics.reduce((latest, topic) =>
      new Date(topic.created_at) > new Date(latest.created_at) ? topic : latest
    );

    return mostRecent.topic_content;
  };

  return (
    <div id="wrapper" className="flex flex-col items-center">
      <div
        id="content"
        className="bg-[#2215f7] rounded-[20px] font-sans px-[30px] py-[20px] text-left w-[900px] float-left shadow-lg"
      >
        <h2 id="category_name" className="text-center text-white text-2xl p-6">
          Home
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <table className="border border-black border-collapse w-full bg-[#f5f5ff]">
          <thead>
            <tr>
              <th className="bg-[#ee6cfa] text-[#010110] text-center p-2 w-[7/10]">
                Category
              </th>
              <th className="bg-[#ee6cfa] text-[#010110] text-center p-2 w-[3/10]">
                Recent Posts
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="p-2 bg-[#f5f5ff] border border-black align-top w-2/3">
                    <h3>
                      <a
                        className="text-black underline hover:text-gray-800"
                        href={`/src/topics.html?id=${category.id}`}
                      >
                        {category.name}
                      </a>
                    </h3>
                    <p>{category.description}</p>
                  </td>
                  <td className="p-2 bg-[#f5f5ff] border border-black text-center align-top w-1/3">
                    {getMostRecentTopicContent(category.topics)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center p-4 text-gray-500">
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
