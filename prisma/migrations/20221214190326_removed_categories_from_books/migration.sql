/*
  Warnings:

  - You are about to drop the column `category1` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `category2` on the `Book` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Book] DROP COLUMN [category1],
[category2];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
