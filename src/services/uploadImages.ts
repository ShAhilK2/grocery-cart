
import cloudinary from "@/lib/cloudinary";

export interface UploadImage {
  imageUrl: string;
  publicId: string;
}

export async function uploadImages(
  images: File[]
): Promise<UploadImage[]> {
  if (images.length < 1 || images.length > 4) {
    throw new Error("You must upload between 1 and 4 images");
  }

  return Promise.all(
    images.map(async (image): Promise<UploadImage> => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<UploadImage>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "grocery_app",
            format: "webp",
          },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error("Cloudinary upload failed"));
              return;
            }

            resolve({
              imageUrl: result.secure_url,
              publicId: result.public_id,
            });
          }
        );

        stream.end(buffer);
      });
    })
  );
}
