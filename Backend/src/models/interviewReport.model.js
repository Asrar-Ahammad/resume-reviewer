const mongoose = require("mongoose");

/**
 * - job description: string
 * - resume text: string
 * - self description: string
 * - matchScore: number
 * - Techinical questions :[{
 *  question: "",
 *  intention: ""
 *  answer: "",
 * }]
 * - Behaviorial questions : [{
 *  question: "",
 *  intention: ""
 *  answer: "",
 * }]
 * - skill gaps : [{
 *  skill: "",
 *  severity: {
 *  type: String,
 *  enum:["low", "medium","high"]
 * },
 * }]
 * - preperation plan: [{
 *  day: Number,
 *  focus: string,
 *  tasks:[String]
 * }]
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required:[true,"Question is required"]
    },
    intention: {
        type: String,
        required:[true,"Intention is required"]
    },
    answer: {
        type: String,
        required:[true,"Answer is required"]
    },   
},{
    _id: false
})

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required:[true,"Question is required"]
    },
    intention: {
        type: String,
        required:[true,"Intention is required"]
    },
    answer: {
        type: String,
        required:[true,"Answer is required"]
    },   
},{
    _id: false
})

const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]    
    },
    severity:{
        type: String,
        enum:["low", "medium","high"],
        required:[true,"Severity is required"]
    }
})

const preperationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true, "Day is required"]
    },
    focus:{
        type: String,
        required: [true, "Focus is required"]
    },
    tasks:[{
        type: String,
        required: [true, "Task is required"]
    }]
})

const interviewReportsSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true, "Job description is required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type: Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapsSchema],
    preperationPlan:[preperationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type: String,
        required:[true, "Job title is required"]
    }
},{
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportsSchema);

module.exports = interviewReportModel