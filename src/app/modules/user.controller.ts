import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { UserValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParseData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User is Created Succesfully.',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'All Users are Retrieved Succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Single Student is Retrieved Succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'No User Found',
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;

    const result = await UserServices.updateUserFromDB();

    res.status(200).json({
      success: true,
      message: 'User Name And Age is Updated Succesfully.',
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is Deleted Succesfully.',
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

export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUser,
  deleteUser,
  updateUser,
};
