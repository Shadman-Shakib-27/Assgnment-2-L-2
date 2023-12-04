import { z } from 'zod';

const userNameValidation = z.object({
  firstName: z.string().min(1, { message: 'First Name is Required' }),
  lastName: z.string().min(1, { message: 'Last Name is Required' }),
});

const userAddressValidation = z.object({
  street: z.string().min(1, { message: 'Street is Required' }),
  city: z.string().min(1, { message: 'City is Required' }),
  country: z.string().min(1, { message: 'Country is Required' }),
});

const userOrderValidation = z.object({
  productName: z.string().min(1, { message: 'Product Name is Required' }),
  price: z.number().min(0.01, { message: 'Price Must be Greater Than 0' }),
  quantity: z.number().min(1, { message: 'Quantity Must be Greater Than 0' }),
});

export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().min(1, { message: 'User Name is Required' }),
  password: z.string().min(1, { message: 'Password is Required' }),
  fullName: userNameValidation,
  email: z.string().email({ message: 'Invalid Email Format' }),
  age: z.number().int().positive(),
  hobbies: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'Hobbies Must Not Be Empty',
  }),
  address: userAddressValidation,
  isActive: z.boolean().default(true),
  orders: z.array(userOrderValidation).default([]).optional(),
});
