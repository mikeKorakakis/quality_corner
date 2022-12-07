import fs from "fs";
const readfolders = function (dir: string) {
  const list = fs.readdirSync(dir);
 
  return list;
};

export default async function handler(req: any, res: any) {
  try {
    const folders = readfolders("public/library");
    return res.status(200).send(folders);
  } catch (err) {
    return res.status(500).send(err);
  }
}
