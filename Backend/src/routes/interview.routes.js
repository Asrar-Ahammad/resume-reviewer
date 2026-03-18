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


/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report on the basis of interview id
 * @access Private
 * @params {interviewId}
 * @returns {interviewReport}
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser, interviewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview
 * @description get all interview reports by logged in user
 * @access Private
 * @returns {interviewReports}
 */
interviewRouter.get("/",authMiddleware.authUser, interviewController.getAllInterviewReportsController)


module.exports = interviewRouter