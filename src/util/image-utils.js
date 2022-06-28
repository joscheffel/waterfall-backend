import * as fs from "fs";

import md5 from "md5";

const uploadDirectory = "./upload/";

export function handleFileUpload(file) {
  return new Promise((resolve, reject) => {
    const { filename } = file.hapi;
    const directoryName = md5(new Date().toDateString());
    const directoryPath = `${uploadDirectory + directoryName}/`;

    const filePath = directoryPath + filename;
    fs.mkdirSync(directoryPath, { recursive: true });

    fs.writeFileSync(filePath, file._data);
    resolve({ filepath: filePath });
  });
}

export function deleteFile(filePath) {
  fs.rmSync(filePath);
}

export function deleteAllFiles() {
  fs.rm("./upload", { recursive: true }, (err) => {
    if (err) console.log(err);
  });
}
