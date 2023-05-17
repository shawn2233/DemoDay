const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/account");
    } catch (err) {
      console.log(err);
    }
  }
};
