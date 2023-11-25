import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateUser); 
router.delete('/:userId', userControllers.deleteUser); 

// order routes
router.put('/:userId/orders', userControllers.updateUserOrder); 
router.get('/:userId/orders', userControllers.getUserOrder);
router.get('/:userId/orders/total-price', userControllers.calculateOrders); 

router.get('/', userControllers.getAllUser);
router.post('/', userControllers.createUser);

export const userRoute = router;