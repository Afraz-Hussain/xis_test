
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


// Enhancment work 
//1.COUNT IMAGES 

export const countImages = async (req, res) => {
  try {
    const count = await ImageModel.countDocuments({ uploadedBy: req.user.userId });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// to filter images based on date
export const filterImages = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Provide start and end dates" });
    }
    const images = await ImageModel.find({
      uploadedBy: req.user.userId,
      createdAt: { $gte: startDate, $lte: endDate }
    });
    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 //filter imgs by label
export const filterImagesByLabel = async (req, res) => {
  try {
    const { label } = req.query;
    if (!label) {
      return res.status(400).json({ message: "Provide label" });
    }
    const images = await ImageModel.find({
      uploadedBy: req.user.userId,
      label
    });
    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// group by label 
export const groupByLabel = async (req, res) => {
  try {
    const result = await ImageModel.aggregate([
      {
        $group: {
          _id: '$label',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          label: '$_id',
          count: 1,
          _id: 0
        }
      }
    ])

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
// per day count
export const perDay = async (req, res) => {
  try {
    const result = await ImageModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ])

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}