import { z } from "zod";

export const createSchema = z.object({
  name: z.string(),  
  private: z.boolean(),  
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const getSchema = z.object({ id: z.number().min(0) });
export const getByNameSchema = z.object({ name: z.string() });

export const updateSchema = createSchema.merge(getSchema);

export const deleteSchema = getSchema;

