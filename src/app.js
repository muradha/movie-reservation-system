import errorHandler from "#middlewares/errorHandler.js";
import compression from "compression";
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";
import { CronJob } from 'cron';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({
  level: 9,
}))

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
