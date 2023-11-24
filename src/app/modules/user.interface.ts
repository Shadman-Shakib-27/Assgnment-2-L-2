import { Model } from 'mongoose';

export type TIuser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  isDeleted:boolean;
  orders: Array<{
    productName: string;
    price: number;
    quantity: number;
  }>;
};

export type IUserMethods = {
  isUserExists(userId: number): Promise<TIuser | null>;
};

export type UserModel = Model<TIuser, Record<string, never>, IUserMethods>;
