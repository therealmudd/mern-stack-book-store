import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        alert("An error occurred. Please check console for details.");
      });
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Create Book</h1>
      {loading ? <Spinner /> : null}
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
              id="author"
              placeholder="Enter author"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publishYear" className="form-label">
              Publish Year
            </label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="form-control"
              id="publishYear"
              placeholder="Enter publish year"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveBook}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
