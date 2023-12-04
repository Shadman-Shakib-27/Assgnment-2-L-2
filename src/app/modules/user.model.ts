import { Schema, model } from 'mongoose';
import { TUser, TUserName, UserModel } from './user.interface';
import config from '../config/index';
import bcrypt from 'bcrypt';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      maxlength: [20, "first name can't be greater than 20 by length"],
      validate: function (value: string) {
        const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return value === nameCapitalized;
      },
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
  },
  { _id: false },
);

const userAddressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const userOrderSchema = new Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: [true, 'Password is Required'],
  },

  fullName: userNameSchema,

  email: {
    type: String,
    unique: true,
    required: [true, 'Email is Required'],
  },
  age: Number,
  hobbies: { type: [String], required: true },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is Required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'Status is Required'],
    default: true,
  },
  orders: { type: [userOrderSchema] },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const users = this;
  users.password = await bcrypt.hash(
    users.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
