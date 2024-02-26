import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import { bookRoutes } from './routes/bookRoutes.js';
import CORS from 'cors';

const app = express();

app.use(CORS({}));
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Hello, world!');
});

app.use('/books', bookRoutes);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Server connected to database");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });