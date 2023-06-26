import multer from "multer";

export const profileUpload = multer({
  dest: "uploads/profile-images/",
  limits: {
    fileSize: 1000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 40000000,
  },
});
