import { UserModel } from './user.model';
import { Iuser } from './user.interface';

const createUserIntoDB = async (iuser: Iuser) => {
  const result = await UserModel.create(iuser);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
