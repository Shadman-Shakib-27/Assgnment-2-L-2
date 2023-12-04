import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';
import { UserServices } from './user.services';
import { User } from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userZodData = userValidationSchema.parse(userData);
    if (await User.isUserExists(userData.userId)) {
      throw new Error('User Already Exists.');
    }
    const result = await UserServices.createUser(userZodData);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully.',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'User Fetched Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found.',
        error: {
          code: 404,
          description: 'User Not Found.',
        },
      });
    }

    const result = await UserServices.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'User Fetched Successfully.',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData = req.body;
    const userZodData = userValidationSchema.parse(updatedData);

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found.',
        error: {
          code: 404,
          description: 'User Not Found.',
        },
      });
    }

    const userData = {
      userId: userZodData.userId,
      username: userZodData.username,
      fullName: userZodData.fullName,
      age: userZodData.age,
      email: userZodData.email,
      isActive: userZodData.isActive,
      hobbies: userZodData.hobbies,
      address: userZodData.address,
    };
    await UserServices.updateUser(userId, userZodData);

    res.status(200).json({
      success: true,
      message: 'User Updated Successfully.',
      data: userData,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found.',
        error: {
          code: 404,
          description: 'User Not Found.',
        },
      });
    }

    // const result = await UserServices.deleteUser(userId);
    await UserServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully.',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found.',
        error: {
          code: 404,
          description: 'User Not Found.',
        },
      });
    }

    await UserServices.updateUserOrder(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order Created Successfully.',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found.',
        error: {
          code: 404,
          description: 'User Not Found.',
        },
      });
    }

    const result = await UserServices.getUserOrder(userId);

    res.status(200).json({
      success: true,
      message: 'Order Fetched Successfully.',
      data: { orders: result },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

const calculateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found.',
        error: {
          code: 404,
          description: 'User Not Found.',
        },
      });
    }
    const result = await UserServices.calculateTotalPriceSpecificUser(userId);

    res.status(200).json({
      success: true,
      message: 'Total-Price Calculated Successfully.',
      totalPrice: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong.',
      error: err,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrder,
  getUserOrder,
  calculateOrders,
};
