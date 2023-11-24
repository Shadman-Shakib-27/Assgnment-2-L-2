import { User } from './user.model';
import { TIuser } from './user.interface';

const createUserIntoDB = async (iuser: TIuser) => {
  // const result = await User.create(iuser);

  const user = new User(iuser);

  if (await user.isUserExists(iuser.userId)) {
    throw new Error('User Already Exists.');
  }

  const result = await user.save();

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
