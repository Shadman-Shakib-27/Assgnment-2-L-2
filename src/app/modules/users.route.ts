import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users/create-user', UserControllers.createUser);

router.get('/users', UserControllers.getAllUser);

router.get('/users/:userId', UserControllers.getSingleUser);

router.delete('/users/:userId', UserControllers.deleteUser);

router.put('/users/:userId', UserControllers.updateUser);

export const UserRoutes = router;
