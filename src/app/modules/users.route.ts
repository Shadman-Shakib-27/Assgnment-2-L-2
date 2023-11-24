import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);

router.get('/users', UserControllers.getAllUser);

router.get('/users/:userId', UserControllers.getSingleUser);

export const UserRoutes = router;
