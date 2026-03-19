const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'https://resume-reviewer-woad.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
]

app.use(
  cors({
    origin: (origin, callback) => {
      console.log('Incoming origin:', origin)
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        console.log('Blocked origin:', origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Require all the routes here
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes")

// Using all the routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);



module.exports = app;
