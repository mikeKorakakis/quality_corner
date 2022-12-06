import { z } from "zod";

export const createSchema = z.object({
  description: z.string(),  
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const getSchema = z.object({ id: z.number().min(0) });

export const updateSchema = createSchema.merge(getSchema);

export const deleteSchema = getSchema;
