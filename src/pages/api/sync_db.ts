import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { FOLDER_ROOT } from "@/config";

const walk = function (dir: string) {
  let results: any = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + "/" + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};

export default async function handler(req: any, res: any) {
  try {
    const folder = req.query.folder;
    const folderPath = FOLDER_ROOT + "/" + folder;
    if (!folder) return res.status(400).send("Δεν ορίστηκε φάκελος");
    const files = walk(folderPath);
    const prisma = new PrismaClient();
    const oldDbFileUrls = await prisma.book.findMany({
      where: { fileUrl: { not: null }, folder: { name: folder } },
      select: { fileUrl: true },
    });
    // remove null values from the array
    let oldDbFileUrlsArray = oldDbFileUrls.map((file) => {
      if (file.fileUrl !== null) {
        return file.fileUrl;
      } else {
        return "";
      }
    });
    // let itemBuffer: any[] = [];
    files.forEach(async (file: string, i: number) => {
      const withoutPublic = file.replace(folderPath + "/", "");
      // split the string by the / character
      const split = withoutPublic.split("/");
      // get the first and second element of the array
      let cat1 = "";
      let cat2 = "";
      if (split.length === 1) {
        [cat1, cat2] = ["", ""];
      } else if (split.length === 2) {
        cat1 = split[0] || "";
        cat2 = "";
      } else if (split.length >= 3) {
        cat1 = split[0] || "";
        cat2 = split[1] || "";
      }

      // get the last element of the array
      const title = split[split.length - 1] || "";
      let titleWithoutExtension = "";
      // find last index of the . character
      if (title.lastIndexOf(".") !== -1) {
        titleWithoutExtension = title.substring(0, title.lastIndexOf("."));
      } else {
        titleWithoutExtension = title;
      }

      // remove the file extension from the last element even if it has a dot in the name
      //import data to prisma
      if (oldDbFileUrlsArray.includes(file)) {
        // remove the file from the oldDbFileUrlsArray array
        oldDbFileUrlsArray = oldDbFileUrlsArray.filter((oldFileUrl: any) => {
          return oldFileUrl !== file;
        });
        return;
      } else {
        const folderId = await prisma.folder.findUnique({
          where: { name: folder },
          select: { id: true },
        });

        // itemBuffer.push({
        //   title: titleWithoutExtension,
        //   category1: cat1,
        //   category2: cat2,
        //   fileUrl: file,
        //   folderId: folderId ? folderId.id : 1,
        // });

        if (folderId) {
          
          await prisma.book.create({
            data: {
                title: titleWithoutExtension,
                category1: cat1,
                category2: cat2,
                fileUrl: file,
                folderId: folderId.id,
              }
          });
        //   itemBuffer = [];
        }
      }
      // remove the file from the oldDbFileUrlsArray array
    });
    oldDbFileUrlsArray.length > 0 &&
      (await prisma.book.deleteMany({
        where: {
          fileUrl: { in: oldDbFileUrlsArray },
        },
      }));

    await prisma.$disconnect();
    return res.status(200).send("OK");
  } catch (err) {
    return res.status(500).send(err);
  }
}
