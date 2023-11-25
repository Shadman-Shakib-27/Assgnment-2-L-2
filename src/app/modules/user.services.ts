import { TOrder, TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists');
  }
  const result = await User.create(userData);

  return result;
};

const getAllUser = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
        fullName: 1,
        username: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

// For Getting Single User
const getSingleUser = async (id: string) => {
  const result = await User.findOne(
    { userId: id },
    {
      _id: 0,
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  );
  return result;
};

// For Updating Single User
const updateUser = async (userId: number | string, data: TUpdateUser) => {
  const result = await User.updateOne({ userId }, data);
  return result;
};

// For Deleting User
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

// For Updating User Order
const updateUserOrder = async (id: string, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: orderData } },
  );
  return result;
};

// For User Orders
const getUserOrder = async (id: string) => {
  const result = await User.findOne({ userId: id });

  return result?.orders;
};

const calculateOrders = async (id: string) => {
  const user = await User.findOne({ userId: id });

  const totalOrderPrice =
    user?.orders?.reduce(
      (total, orders) => total + orders.price * orders.quantity,
      0,
    ) || 0;
  return totalOrderPrice;
};

export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrder,
  getUserOrder,
  calculateOrders,
};
