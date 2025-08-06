import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,  //c;oudinary url  
        required: true,
    },
    coverImage: {
        type: String,  //cloudinary url     
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    password: {
        type: String,
        required: [true, 'Password is re quired'],
    },
    refreshToken: {
        type: String,
    },



}, { timestamps: true });


/// this are the middlewares 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

//now we are going to create a method to compare the password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)   //this.password is the hashed password stored in the database
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(

        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(

        {
            _id: this._id,

        },
        process.env.ACCESS_REFRESH_SECRET,
        {
            expiresIn: process.env.ACCESS_REFRESH_EXPIRY || '1d'
        }
    )
}



export const User = mongoose.model("User", userSchema);
