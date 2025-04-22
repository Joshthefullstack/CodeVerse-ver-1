import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './dbConfig/index';
const corsMw = require("./external-libs/cors");
const redisSession = require("./external-libs/session");


const app = express();
dotenv.config();


pool.connect((err, client, done) => {
  if (err) console.error(err);
  else console.log("Connected to database");
  done();
});


// app.use(cors());
app.use(corsMw)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(redisSession);
// app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));