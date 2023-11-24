import { z } from 'zod';

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .max(20, { message: "User Name Can't Exceeded More Than 20 Characters." }),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  email: z.string(),
  age: z.number(),
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderSchema).default([]),
});

export const UserValidationSchema = userSchema;
