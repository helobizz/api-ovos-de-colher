import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    whatsapp: String,
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
});

const User = mongoose.model('User', userSchema);

export default User;