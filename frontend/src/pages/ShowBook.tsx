import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const ShowBook = () => {
  const [book, setBook] = useState<Book | null>(null); // Changed undefined to null
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]); // Added id as a dependency

  return (
    <div className="container"> {/* Added container class */}
      <BackButton />
      <h1>Book details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="card">
          <div className="card-header">{book ? book.title : "Loading..."}</div> {/* Improved readability */}
          <div className="card-body">
            {book && (
              <>
                <p className="card-text">
                  <span className="badge text-bg-primary">Id:</span>&nbsp;{book._id}
                </p>
                <p className="card-text">
                  <span className="badge text-bg-primary">Author:</span>&nbsp;{book.author}
                </p>
                <p className="card-text">
                  <span className="badge text-bg-primary">Publish Year:</span>&nbsp;{book.publishYear}
                </p>
                <p className="card-text">
                  <span className="badge text-bg-primary">Created:</span>&nbsp;{new Date(book.createdAt).toLocaleTimeString().toString()}
                </p>
                <p className="card-text">
                  <span className="badge text-bg-primary">Updated:</span>&nbsp;{new Date(book.updatedAt).toLocaleTimeString().toString()}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
