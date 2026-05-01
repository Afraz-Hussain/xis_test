import mongoose from 'mongoose';

const ImageModel = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    url: { type: String, required: true },
    size: {
        type: Number, 
        required: true
    },
    label: {
        type: String,
        default: 'untagged', 
        trim: true
    },
   
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, { timestamps: true }); 


export default mongoose.model("ImageModel",ImageModel)