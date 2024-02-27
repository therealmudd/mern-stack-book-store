import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        alert("An error happened. Check console.");
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        alert("An error happened. Check console.");
      });
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
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
              />
            </div>
            <button
              type="button"
              onClick={handleEditBook}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;