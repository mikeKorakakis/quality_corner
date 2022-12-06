import fs from "fs";
import { PrismaClient } from "@prisma/client";

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
    const files = walk("public/QualityCorner");
    const prisma = new PrismaClient();
    const oldDbFileUrls = await prisma.book.findMany({
      where: { fileUrl: { not: null } },
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

   
    files.forEach(async (file: any) => {
      const withoutPublic = file.replace("public/QualityCorner/", "");
      // split the string by the / character
      const split = withoutPublic.split("/");
      // get the first and second element of the array
      let cat1: string | null = null;
      let cat2: string | null = null;
      if (split.length === 1) {
        [cat1, cat2] = [null, null];
      } else if (split.length === 2) {
        [cat1] = split;
        cat2 = null;
      } else if (split.length >= 3) {
        [cat1, cat2] = split;
      }

      // get the last element of the array
      const title = split[split.length - 1];
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
      
        await prisma.book.create({
          data: {
            title: titleWithoutExtension,
            category1: cat1,
            category2: cat2,
            fileUrl: file,
          },
        });
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
