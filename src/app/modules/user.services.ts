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
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUserFromDB = async () => {
  const result = await User.updateOne({
    $set: { username: 'Shamoly Jahan', age: '200' },
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
