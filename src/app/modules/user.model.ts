import { Schema, model } from 'mongoose';
import { Iuser } from './user.interface';

type order = {
  productName: string;
  price: number;
  quantity: number;
};

const OrderSchema = new Schema<order>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<Iuser>({
  userId: { type: Number, unique: true, required: true },
  userName: {
    type: String,
    required: [true, 'User Name is Required.'],
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
  },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: {
    type: [OrderSchema],
    default: [],
  },
});

export const UserModel = model<Iuser>('User', userSchema);
