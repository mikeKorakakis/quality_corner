import fs from "fs";
import { FOLDER_ROOT } from "@/config";

const walk = function (dir: string) {
    let results: any = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
      file = dir + "/" + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results.push(file);
        results = results.concat(walk(file));
      }
    });
    return results;
  };

export default async function handler(req: any, res: any) {
  try {
    const folders = walk(FOLDER_ROOT);

    return res.status(200).send(folders);
  } catch (err) {
    return res.status(500).send(err);
  }
}
