import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';  // Use default import for bcrypt

const { genSalt, hash, compare } = bcrypt;  // Destructure the necessary methods

// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    height: {
        type: Number,
        required: [true, 'Height is required'],
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    mesdical_history: {
        type: String,
    },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await compare(candidatePassword, this.password);
};

// Export User model
const User = model('User', UserSchema);

export default User;
