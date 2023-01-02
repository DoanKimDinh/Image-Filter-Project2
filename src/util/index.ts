import fs from "fs";
import Jimp = require("jimp");

export async function filterImage(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await Jimp.read(inputURL);
      const pathImage = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await image
        .resize(256, 256)
        .quality(60)
        .greyscale()
        .write(__dirname + pathImage, (img) => {
          resolve(__dirname + pathImage);
        });
    } catch (error) {
      reject(error);
    }
  });
} 
export async function deleteFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
