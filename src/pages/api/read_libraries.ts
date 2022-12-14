import fs from "fs";
import { FOLDER_ROOT } from "@/config";
import { PrismaClient } from "@prisma/client";
const readfolders = function (dir: string) {
  const list = fs.readdirSync(dir);

  return list;
};

const createFoldersInDb = async (folderPath: string) => {
  const libraries = fs.readdirSync(folderPath);
  const prisma = new PrismaClient();

  libraries.forEach(async (library) => {
    const libraryExists = await prisma.library.findUnique({
      where: { name: library },
    });
    if (!libraryExists) {
      await prisma.library.create({
        data: {
          name: library,
          private: false,
        },
      });
      const folders = fs.readdirSync(folderPath + "/" + library);
      folders.forEach(async (folder) => {
        const folderExists = await prisma.folder.findUnique({
          where: { name: folder },
        });
        if (!folderExists) {
          await prisma.folder.create({
            data: {
              name: folder,
            },
          });
        }
        const subFolders = fs.readdirSync(
          folderPath + "/" + library + "/" + folder
        );
        subFolders.forEach(async (subFolder) => {
          const subFolderExists = await prisma.subFolder.findUnique({
            where: { name: subFolder },
          });
          if (!subFolderExists) {
            await prisma.subFolder.create({
              data: {
                name: subFolder,
              },
            });
          }
        });
      });
    }
  });

  //delete folders in db that are not in the folderPath
  // const dbFolders = await prisma.folder.findMany();
  // dbFolders.forEach(async (dbFolder) => {
  //   if (!folders.includes(dbFolder.name)) {
  //     await prisma.folder.delete({
  //       where: { name: dbFolder.name },
  //     });
  //   }
  // });
};

export default async function handler(req: any, res: any) {
  try {
    const folders = readfolders(FOLDER_ROOT);
    createFoldersInDb(FOLDER_ROOT);

    return res.status(200).send(folders);
  } catch (err) {
    return res.status(500).send(err);
  }
}
