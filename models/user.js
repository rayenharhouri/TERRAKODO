import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ]
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);