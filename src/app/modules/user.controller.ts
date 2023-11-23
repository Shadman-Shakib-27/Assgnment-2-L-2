import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User is Created Succesfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
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
    const { user:userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Single Student is Retrieved Succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUser,
};
