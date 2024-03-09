import { MONGODB_URI } from './utils/config.js';
import express from 'express';
import cors from 'cors';
import notesRouter from './controllers/notes.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {
  errorHandler,
  unknownEndpoint,
  requestLogger,
} from './utils/middleware.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms
mongoose.set('strictQuery', false);

logger.info('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(bodyParser());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);
app.use(express.static('dist'));

app.use('/api/notes', notesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;