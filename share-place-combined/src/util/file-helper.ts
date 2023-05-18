import fs from "fs/promises";
import path from "path";

export async function deleteFile(filePath: string) {
  try {
    await fs.unlink(path.join(__dirname, `../../${filePath}`));
  } catch (error: any) {
    console.log(error);
  }
}
