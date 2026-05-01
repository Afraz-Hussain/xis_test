
import ImageModel from "../model/ImageModel.js";
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new ImageModel({
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      size: file.size,
      label: req.body.label || "untagged",
      uploadedBy: req.user.userId
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
