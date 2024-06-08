import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs"

const emailRegex: RegExp = /[0,10]/

export interface Iuser extends Document {
    name: string,
    email: string,
    password: string,
    avatar: {
        public_id: string,
        url: string
    },
    role: string,
    isVerified: boolean,
    courses: {
        courseID: string
    }[],
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema: Schema<Iuser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: {
            validator: function (value: string) {
                return emailRegex.test(value)
            },
            message: "please enter valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password should atleast 6"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [{ courseID: String }],
}, { timestamps: true })


// hash password before save
userSchema.pre<Iuser>('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

// compare pasword
userSchema.methods.comparePassword = async function (enterPassword: string): Promise<Boolean> {
    return await bcrypt.compare(enterPassword, this.password)
};

const userModel: Model<Iuser> = mongoose.model("User", userSchema)
export default userModel