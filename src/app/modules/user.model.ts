import { Schema, model } from 'mongoose';
import { TUser, TUserName, UserModel } from './user.interface';
import config from '../config/index';
import bcrypt from 'bcrypt';

// This is User Sub Schema
const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is Mandatory.'],
      maxlength: [20, "First name cannot be greater than 20 length"],
      validate: function (value: string) {
        const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return value === nameCapitalized;
      },
    },

    lastName: {
      type: String,
      required: [true, 'Last Name is Mandatory'],
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

// This is User Schema
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  fullName: userNameSchema,

  email: {
    type: String,
    unique: true,
    required: [true, 'Email is Mandatory'],
  },
  age: Number,
  hobbies: { type: [String], required: true },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is Mandatory'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'Status is Mandatory'],
    default: true,
  },
  orders: { type: [userOrderSchema] },
});

// Creating Middleware

// Before Sending Data To MongoDB
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const users = this;

  // Storing Hashing Password Into MongoDB.

  users.password = await bcrypt.hash(
    users.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// After User Saved
userSchema.post('save', function (document, next) {
  document.password = '';
  next();
});

// Creating Custom Static Methods
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

// User
export const User = model<TUser, UserModel>('User', userSchema);
