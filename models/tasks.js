import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            enum: ['1','2','3','4','5'],
            required: true
        },
        status: {
            type: String,
            enum: ['Open Task','In Progress','Done'],
            default: 'Open Task'
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true
        },
        dueDate:{
            type: Date,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default model('Task', taskSchema);