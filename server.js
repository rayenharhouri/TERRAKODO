import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import user from './routes/user.js';
import task from './routes/tasks.js';
import {errorHandler} from './middleware/error-handler.js';


dotenv.config()

const app = express();
const port = process.env.PORT || 9090;
const databaseName = process.env.databaseName;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", user)
app.use("/task", task)

//MiddleWares
app.use(errorHandler)

app.listen(port, () => {
    console.log(databaseName);
    console.log(`Server running at http://localhost:${port}/`);
  });