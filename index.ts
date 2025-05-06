import express from 'express';
import dotenv from 'dotenv';
import pool from './dbConfig/index';
import routes from './routes';
import createTables from './dbConfig/setupDb';

const corsMw = require("./external-libs/cors");

createTables();
const app = express();
dotenv.config();


pool.connect((err, client, done) => {
  if (err) console.error(err);
  else console.log("Connected to database");
  done();
});



app.use('/api/v1', routes);

// app.use(cors());
app.use(corsMw)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(redisSession);
// require("./routes")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));