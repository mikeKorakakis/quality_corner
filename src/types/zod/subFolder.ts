import { z } from "zod";

export const createSchema = z.object({
  name: z.string(),  
  description: z.string().nullish(),
  folderId: z.number()
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const getSchema = z.object({ id: z.number().min(0) });
export const getByFolderSchema = z.object({ folder: z.string() });

export const getByNameSchema = z.object({ name: z.string() });

export const updateSchema = z.object({
    id: z.number().min(0)
    name: z.string(),  
    description: z.string().nullish()
  });
export const updateManySchema = z.array(updateSchema);

export const deleteSchema = getSchema;

