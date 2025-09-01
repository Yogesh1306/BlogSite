import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique : true,
        trim: true,
        minlength: 1,
    }
},{timestamps: true})

export const Category = mongoose.model("Category", categorySchema)