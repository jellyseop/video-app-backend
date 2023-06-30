import multer from "multer";

const profileUpload = multer({
  dest: "uploads/profile-images/",
  limits: {
    fileSize: 1000000,
  },
});
const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 40000000,
  },
});

export default {
  profileUpload,
  videoUpload,
};
