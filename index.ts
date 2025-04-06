import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import pool from './config/dbConfig';

const app = express();
dotenv.config();


// pool.connect((err, client, done) => {
//   if (err) console.error(err);
//   else console.log("Connected to database");
//   done();
// });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));