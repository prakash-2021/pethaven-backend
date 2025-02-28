import multer from "@koa/multer";
import path from "path";
import { AppError } from "../exceptions";

export const upload = multer({
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpe" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp"
    ) {
      cb(new AppError("Invalid image format", 415, true), false);
      return;
    }

    cb(null, true);
  },
  limits: { fileSize: 10_000_000 }, // * 10MB
});

export default upload;
