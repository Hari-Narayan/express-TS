import { join } from "path";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { existsSync, unlinkSync } from "fs";

import configs from "../configs";

export default class FileUploadHelper {
  static singleFileUpload(
    req: Request,
    key: string = "",
    folder: string = ""
  ): any {
    try {
      if (req.files && req.files[key]) {
        const file: any = req.files[key];

        const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
        file.mv(`.${configs.uploadPath}${folder}/${fileName}`);

        req.body[key] = fileName;
      }
    } catch (error: any) {
      throw error;
    }
  }

  static removeSingleFile(filePath: string) {
    try {
      if (!filePath) return;

      const [, oldFile] = filePath.split(configs.baseUrl);
      const oldFilePath = join(process.cwd(), configs.uploadPath, oldFile);

      if (!existsSync(oldFilePath)) return;

      unlinkSync(oldFilePath);
    } catch (error) {
      throw error;
    }
  }
}
