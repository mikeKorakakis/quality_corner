import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(1),
});

export const updateSchema = createSchema.merge(
  z.object({ id: z.string().min(0) })
);

export const getSchema = z.object({ id: z.string().min(0) });
export const deleteSchema = z.object({ id: z.string().min(0) });
