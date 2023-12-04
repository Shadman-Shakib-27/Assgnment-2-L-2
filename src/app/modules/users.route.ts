import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// Creating New User
router.post('/', userControllers.createUser);

// Get All User
router.get('/', userControllers.getAllUser);

// Getting Single User
router.get('/:userId', userControllers.getSingleUser);

// Updating User
router.put('/:userId', userControllers.updateUser);

// Deleting User
router.delete('/:userId', userControllers.deleteUser);

// Upating Order User
router.put('/:userId/orders', userControllers.updateUserOrder);

// Get User Order
router.get('/:userId/orders', userControllers.getUserOrder);

// Get Orders Total Price
router.get('/:userId/orders/total-price', userControllers.calculateOrders);

export const userRoute = router;
