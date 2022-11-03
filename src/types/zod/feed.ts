import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  date: z.date().nullable(),
  image: z.string().nullable(),
  published: z.boolean().nullable(),
  categoryId: z.string(),
});

export const updateSchema = createSchema.merge(
  z.object({ id: z.number().min(0) })
);

export const getSchema = z.object({ id: z.number().min(0) });

export const deleteSchema = z.object({ id: z.number().min(0) });