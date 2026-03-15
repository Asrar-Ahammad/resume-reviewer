const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upolad = require("../middlewares/file.middleware")

const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of user self description, resume pdf and job description
 * @access Private
 * @body {resume, selfDescription, jobDescription}
 * @returns {interviewReport}
 */
interviewRouter.post("/",authMiddleware.authUser,upolad.single("resume"), interviewController.generateInterviewReportController)


module.exports = interviewRouter