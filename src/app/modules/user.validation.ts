import { z } from 'zod';

//This is  Define The Sub-Validations.
const userNameValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const userAddressValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userOrderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// This is Define The User Validation
export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  userName: z.string(),
  password: z.string(),
  fullName: userNameValidation,
  email: z.string().email(),
  age: z.number().int().positive(),
  hobbies: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'Hobbies must not be empty',
  }),
  address: userAddressValidation,
  isActive: z.boolean().default(true),
  orders: z.array(userOrderValidation).default([]).optional(),
});