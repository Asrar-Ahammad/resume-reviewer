const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matchs with the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The techinical question can be asked in interview"),
        intention: z.string().describe("The intention of the interviewer"),
        answer: z.string().describe("How to answer this question, what points to cover, what approact to take etc."),
    })).describe("Technical questions that can be asked in interview along with intention and answer"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in interview"),
        intention: z.string().describe("The intention of the interviewer"),
        answer: z.string().describe("How to answer this question, what points to cover, what approact to take etc."),
    })).describe("Behavioral questions that can be asked in interview along with intention and answer"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap i.e (low, medium, high)")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preperationPlan: z.array(z.object({
        day: z.number().describe("The day of the preperation plan"),
        focus: z.string().describe("The main focus of this day in the preperation plan"),
        tasks: z.array(z.string()).describe("The List of tasks to be done in the preperation plan")
    })).describe("A day-wise preperation plan for the candidate to follow in order to get ready for interview"),
})

async function genreateInterviewReport(resume, selfDescription, jobDescription) {

    const prompt = `
        You are an expert technical recruiter and interview coach. Analyze the candidate's profile against the job description and generate a detailed interview preparation report.

        CANDIDATE RESUME:
        ${resume}

        CANDIDATE SELF DESCRIPTION:
        ${selfDescription}

        JOB DESCRIPTION:
        ${jobDescription}

        Generate a structured JSON report. You MUST follow the exact field names as specified below. Do not rename, abbreviate, or change the casing of any field.

        The JSON object must contain these exact keys:

        1. "matchScore" (number, 0-100): How well the candidate matches the job description.

        2. "technicalQuestions" (array of objects): 5 to 7 technical questions. Each object must have exactly these three keys:
        - "question" (string): The exact technical question an interviewer would ask.
        - "intention" (string): Why the interviewer is asking this question.
        - "answer" (string): Detailed answer guide — key points, concepts, and approach the candidate should take.

        3. "behavioralQuestions" (array of objects): 4 to 5 behavioral questions. Each object must have exactly these three keys:
        - "question" (string): The exact behavioral question an interviewer would ask.
        - "intention" (string): Why the interviewer is asking this question.
        - "answer" (string): Detailed answer guide using the STAR method (Situation, Task, Action, Result).

        4. "skillGaps" (array of objects): Skills mentioned in the job description that are weak or missing in the candidate's profile. Each object must have exactly these two keys:
        - "skill" (string): The name of the skill that is lacking.
        - "severity" (string): Must be exactly one of these three values — "low", "medium", or "high".

        5. "preperationPlan" (array of objects): A 7-day preparation plan. Each object must have exactly these three keys:
        - "day" (number): The day number (1 through 7).
        - "focus" (string): The main focus area for that day.
        - "tasks" (array of strings): List of specific actionable tasks for that day.

        CRITICAL RULES:
        - Return only a valid JSON object. No markdown, no code fences, no explanation outside the JSON.
        - All array items must be actual JSON objects, NOT stringified JSON.
        - Use only the exact field names listed above. Do not use snake_case, SCREAMING_SNAKE_CASE, or any variation.
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(response.text)
}

module.exports = genreateInterviewReport