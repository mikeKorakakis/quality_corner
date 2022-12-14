import { z } from "zod";

export const createSchema = z.object({
  name: z.string(),  
  description: z.string().nullish(),  
  private: z.boolean(),  
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const getSchema = z.object({ id: z.number().min(0) });
export const getByNameSchema = z.object({ name: z.string() });

export const updateSchema = createSchema.merge(getSchema);
export const updateManySchema = z.array(updateSchema);

export const deleteSchema = getSchema;

