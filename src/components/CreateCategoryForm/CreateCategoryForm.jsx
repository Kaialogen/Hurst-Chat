import { useState } from "react";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const categorySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Category added:", result);
      alert("Category added successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <div id="wrapper" className="flex flex-col items-center">
      <div
        id="content"
        className="bg-[#2215f7] rounded-[20px] font-sans px-[30px] py-[20px] text-left w-[900px] float-left shadow-lg"
      >
        <h2 className="text-center text-white text-2xl p-6">Create Category</h2>
        <form
          id="create_category_form"
          className="flex flex-col gap-6 items-center w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow"
          onSubmit={categorySubmit}
        >
          <div className="w-full">
            <label
              htmlFor="category_name"
              className="block mb-2 font-semibold text-gray-700"
            >
              Category Name:
            </label>
            <input
              type="text"
              id="category_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="category_description"
              className="block mb-2 font-semibold text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="category_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}
