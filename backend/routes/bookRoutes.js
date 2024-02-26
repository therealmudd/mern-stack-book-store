import { Book } from '../models/bookModel.js';
import { Router } from 'express';

const router = new Router();

// Save a new book (CREATE)
router.post('/', async (req, res) => {
  try{
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ){
      return res.status(400).send( {
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Get all books from database
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try{
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ){
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result){
      return res.status(404).send({message: 'Book not found'});
    }

    return res.status(200).send({message: 'Book updated successfully'});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});


// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result){
      return res.status(404).send({message: 'Book not found'});
    }

    return res.status(200).send({message: 'Book deleted successfully'});
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export const bookRoutes = router;