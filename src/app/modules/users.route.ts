import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateUser);
router.delete('/:userId', userControllers.deleteUser);
router.put('/:userId/orders', userControllers.updateUserOrder);
router.get('/:userId/orders', userControllers.getUserOrder);
router.get('/:userId/orders/total-price', userControllers.calculateOrders);
router.post('/', userControllers.createUser);

export const userRoute = router;
