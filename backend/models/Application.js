const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        company:{
            type: String,
            required: true,
        },

        role: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        applicationDate:{
            type: String,
            required: true,
        },
        status:{
            type:String,
            required: true,
            enum: ["Applied", "Interview", "Selected", "Rejected"],
        },

        jobType: {
            type:String,
            required: true,
            enum:["Full-time", "Part-time", "Internship", "Contract"],
        },
        
        jobUrl:{
            type: String,
        },
        notes:{
            type: String,
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Application", applicationSchema);