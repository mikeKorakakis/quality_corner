import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Body is required" }),
  date: z.date().nullable(),
  image: z.any().nullable(),
  published: z.boolean().nullable(),
  categoryId: z.string().min(1, { message: "Category is required" }),
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const getSchema = z.object({ id: z.number().min(0) });

export const updateSchema = createSchema.merge(getSchema);

export const deleteSchema = getSchema;
