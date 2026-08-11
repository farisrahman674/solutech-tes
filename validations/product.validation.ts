import { z } from "zod";

export const createProductSchema = z
  .object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().min(0),
  })
  .strict();

export const updateProductSchema = createProductSchema.partial();
