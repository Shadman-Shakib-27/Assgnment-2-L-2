import { Request, Response } from 'express';
import { userValidationSchema } from './user.validation';
import { UserServices } from './user.services';
import { TUser } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    //ZOD Validation
    const userZodData = userValidationSchema.parse(userData);

    const result = await UserServices.createUser(userZodData);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'User Fetched Successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUser(userId);

    if (result === null) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
        error: {
          code: 404,
          description: 'User Not Found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User Fetched Successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData: TUser = req.body;

    const result = await UserServices.updateUser(userId, updatedData);
    if (result?.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
        error: {
          code: 404,
          description: 'User Not Found!',
        },
      });
    }
    const userData = {
      userId: updatedData.userId,
      userName: updatedData.userName,
      fullName: updatedData.fullName,
      age: updatedData.age,
      email: updatedData.email,
      isActive: updatedData.isActive,
      hobbies: updatedData.hobbies,
      address: updatedData.address,
    };

    res.status(200).json({
      success: true,
      message: 'User Updated Successfully!',
      data: userData,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

// delete a specific user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log(userId);

    const result = await UserServices.deleteUser(userId);

    if (result?.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found!',
        error: {
          code: 404,
          description: 'User Not Found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User Deleted Successfully!',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

// update the order property from order
const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    const result = await UserServices.updateUserOrder(userId, orderData);
    if (result?.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found!',
        error: {
          code: 404,
          description: 'User Not Found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order Created Successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

// get all orders of a user
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getUserOrder(userId);
    // console.log(result);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found!',
        error: {
          code: 404,
          description: 'User Not Found',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order Fetched Successfully',
      orders: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    });
  }
};

// calculate orders
const calculateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.calculateOrders(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found!!',
        error: {
          code: 404,
          description: 'User Not Found!!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'Total price Calculated Successfully!!',
      totalPrice: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong!',
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
