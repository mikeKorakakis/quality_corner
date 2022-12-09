import { z } from "zod";
import { getAllSchema } from "./general";

export const createSchema = z.object({
  description: z.string(),
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const getSchema = z.object({ id: z.number().min(0) });

export const deleteByFolderIdSchema = z.object({ id: z.number().min(0) });
export const transferBooksToFolderSchema = z.object({
  fromId: z.number().min(0),
  toId: z.number().min(0),
});

export const updateSchema = createSchema.merge(getSchema);

export const deleteSchema = getSchema;

export const getAllInFolderSchema = getAllSchema.merge(
  z.object({ folder: z.string() })
);

export const getAllCatInFolderSchema = z.object({ folder: z.string() });
