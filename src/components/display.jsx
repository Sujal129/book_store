import React, { useState, useEffect } from "react";
import "../css/display.css";
import BookCard from "./BookCard.jsx";

function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]); // Hold all books from API

  useEffect(() => {
    // Fetch all books from API on mount
    fetch("http://localhost:4000/book/all")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data); // Save full list for filtering
        const freeBooks = data.filter((book) => book.category === "free");
        setDefaultBooks(freeBooks);
      })
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  const fetchBooks = (query = "") => {
    if (query) {
      const filtered = allBooks.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setBooks(filtered);
    } else {
      setBooks([]);
    }
  };

  const handleSearch = () => {
    fetchBooks(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    fetchBooks(e.target.value);
  };

  return (
    <div className="books-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <br />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="book-results">
        {books.length === 0 && searchTerm === "" ? (
          <div className="book-card-container">
            {defaultBooks.length > 0 ? (
              defaultBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <p>No default books available</p>
            )}
          </div>
        ) : (
          <div>
            <h2>{searchTerm ? "Search Results" : "Default Books"}</h2>
            <div className="book-card-container">
              {books.length === 0 && searchTerm ? (
                <p>No results found</p>
              ) : (
                books.map((book) => <BookCard key={book.id} book={book} />)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
