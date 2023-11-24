import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users.route';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// Application Route
// app.use('/api/v1/users', UserRoutes);

// app.use('/GET/api', UserRoutes);
app.use('/api', UserRoutes);

export default app;
