const { OpenAI } = require('openai')
const { zodTextFormat } = require("openai/helpers/zod");
const { z } = require('zod')

const openai = new OpenAI()

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
    title: z.string().describe("The title of the job for which the interview report is generated")
})

const SYSTEM_PROMPT = `
You are an expert technical recruiter and interview coach. 
Analyze the candidate's profile against the job description and generate a detailed interview preparation report.

Follow these rules strictly:
- Generate 5 to 7 technical questions relevant to the job description and candidate's background.
- Generate 4 to 5 behavioral questions. Use the STAR method (Situation, Task, Action, Result) in the answer guide.
- Identify skill gaps with severity: "low", "medium", or "high".
- Create a 7-day preparation plan with specific actionable tasks for each day.
- Generate a title of the job for which the interview report is generated.
- Be detailed and specific — tailor everything to the candidate's actual profile and the job description provided.
`

async function generateInterviewReport(resume, selfDescription, jobDescription) {

    const userMessage = `
        CANDIDATE RESUME:
        ${resume}

        CANDIDATE SELF DESCRIPTION:
        ${selfDescription}

        JOB DESCRIPTION:
        ${jobDescription}

        Generate the interview preparation report based on the above details.
    `

    const response = await openai.responses.parse({
        model: "gpt-4o-2024-08-06",
        input: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: userMessage
            }
        ],
        text: {
            format: zodTextFormat(interviewReportSchema, "interviewReport"),
        },
    })

    const report = response.output_parsed

    if (!report) {
        throw new Error("Failed to parse interview report. The model may have refused or returned invalid output.")
    }

    return report
}

module.exports = generateInterviewReport