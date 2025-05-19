import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
export default app;
