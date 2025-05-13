import mongoose, { now } from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true
    }, 
    author: {
        type: Number,
        default: now
    },
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
