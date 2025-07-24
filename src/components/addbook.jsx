import React, { useState } from "react";

const AddBook = () => {
  const [book, setBook] = useState({
    id: "",
    category: "",
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    price: "",
    image: "",
    url: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/book/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...book,
          id: Number(book.id),
          publishedYear: Number(book.publishedYear)
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Book added successfully!");
        setBook({
          id: "",
          category: "",
          title: "",
          author: "",
          genre: "",
          publishedYear: "",
          price: "",
          image: "",
          url: ""
        });
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      alert("❌ Network error");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Add New Book</h2>

        {[
          { name: "id", label: "ID" },
          { name: "category", label: "Category" },
          { name: "title", label: "Title" },
          { name: "author", label: "Author" },
          { name: "genre", label: "Genre" },
          { name: "publishedYear", label: "Published Year" },
          { name: "price", label: "Price" },
          { name: "image", label: "Image URL" },
          { name: "url", label: "PDF URL" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={book[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={field.label}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
