import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleInfo,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {/* Add container class here */}
      <h1>Books List</h1>
      <Link to="/books/create" style={{ float: "right" }}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Publish Year</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <th scope="row">{index + 1}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishYear}</td>
                <td>
                  <Link to={`/books/details/${book._id}`}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </Link>{" "}
                  &nbsp;
                  <Link to={`/books/edit/${book._id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>{" "}
                  &nbsp;
                  <Link to={`/books/delete/${book._id}`}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
