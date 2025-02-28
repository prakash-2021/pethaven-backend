import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { Readable } from "stream";

const uploadImage = async (
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, allowed_formats: ["jpg", "jpe", "jpeg", "png", "webp"] },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    // ? Convert buffer into readable stream before uploading
    Readable.from(buffer).pipe(uploadStream);
  });
};

export default uploadImage;
