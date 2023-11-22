import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// Parser
app.use(express.json());
app.use(cors());

// Application Route
// app.use('/api/v1/students');

const getAresponse = (req: Request, res: Response) => {
  res.send("Hello Fucking World!");
};

app.get("/", getAresponse);

export default app;
