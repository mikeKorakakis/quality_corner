import fs from "fs";
import { FOLDER_ROOT } from "@/config";
import { PrismaClient } from "@prisma/client";

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
const readfolders = function (dir: string) {
  const list = fs.readdirSync(dir);

  return list;
};

const createFoldersInDb = async (folderPath: string) => {
  const libraries = getDirectories(folderPath);
  const prisma = new PrismaClient();
  console.log('libraries',libraries)

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
    }
    const folders = getDirectories(folderPath + "/" + library);
    console.log("folders in library", library, folders);
    folders.forEach(async (folder) => {
      let folderExists = await prisma.folder.findFirst({
        where: { name: folder, library: { name: library } },
      });
      console.log('folderExists',folderExists, folder, library)
      if (!folderExists) {
        console.log('foldercrate')
        folderExists = await prisma.folder.create({
          data: {
            name: folder,
            library: { connect: { name: library } },
          },
        });
      }
      const subFolders = getDirectories(
        folderPath + "/" + library + "/" + folder
      );
      subFolders.forEach(async (subFolder) => {
        const subFolderExists = await prisma.subFolder.findFirst({
          where: {
            name: subFolder,
            folder: { name: folder },
            library: { name: library },
          },
        });
        console.log('subFolderExists',subFolderExists)
        console.log('subfolders in folder', library, folder, subFolder);
        if (!subFolderExists && folderExists) {
            console.log('subfoldercreate')
          await prisma.subFolder.create({
            data: {
              name: subFolder,
              folder: { connect: { id: folderExists.id } },
              library: { connect: { name: library } },
            },
          });
        }
      });
    });
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
    console.log('getfolders in db')
    const folders = readfolders(FOLDER_ROOT);
    createFoldersInDb(FOLDER_ROOT);

    return res.status(200).send(folders);
  } catch (err) {
    return res.status(500).send(err);
  }
}
