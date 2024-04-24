import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Labs/Lab5.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuizQuestionRoutes from "./Kanbas/Quizzes/QuizQuestions/routes.js";
import QuizPreviewRoutes from "./Kanbas/Quizzes/QuizPreview/routes.js";

import "dotenv/config";
import session from "express-session";

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING; // you can add your local database connection string here too if needed
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/kanbas';
const DB_NAME = "kanbas";

mongoose.connect(CONNECTION_STRING, { dbName: DB_NAME });

const app = express();

const secret = process.env.SESSION_SECRET;

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);
const sessionOptions = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);
QuizRoutes(app)
QuizQuestionRoutes(app);
QuizPreviewRoutes(app);
app.listen(process.env.PORT || 4000);