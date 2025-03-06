import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
if (!PORT) throw new Error("PORT is not defined");

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
