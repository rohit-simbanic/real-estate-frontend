export const getCloudinaryUrl = (filename: any) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${filename}`;
};
