import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
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
      <h1>Delete Book</h1>
      {loading ? <Spinner /> : null}
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">
            Are you sure you want to delete this book?
          </h3>
          <button
            className="btn btn-danger"
            onClick={handleDeleteBook}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, delete it"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
