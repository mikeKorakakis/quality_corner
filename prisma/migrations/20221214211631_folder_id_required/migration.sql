/*
  Warnings:

  - Made the column `folderId` on table `SubFolder` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[SubFolder] DROP CONSTRAINT [SubFolder_folderId_fkey];

-- AlterTable
ALTER TABLE [dbo].[SubFolder] ALTER COLUMN [folderId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[SubFolder] ADD CONSTRAINT [SubFolder_folderId_fkey] FOREIGN KEY ([folderId]) REFERENCES [dbo].[Folder]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
