import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/users.route';


const app: Application = express();

// Parser Middleware
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi There From Next Level Developer SHADMAN!!!');
});

app.all('*', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Your Route is Not Exists Bro!!!',
  });
});

export default app;
