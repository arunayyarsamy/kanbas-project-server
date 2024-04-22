import quizModel from "../model.js";

import * as dao from "./dao.js";

function QuizQuestionRoutes(app) {
    const createQuestion = async (req, res) => {
        const quizId = req.params.qid;
        const question = await dao.createQuizQuestion(req.body);
        const quiz = await quizModel.findById(quizId);
        quiz.questions.push(question);
        await quiz.save();
        res.json(quiz);
    }

    const updateQuestion = async (req, res) => {
        const questionId = req.params.quid;
        const question  = await dao.updateQuizQuestion(questionId, req.body);
        res.json(question);
    }

    const deleteQuestion = async (req, res) => {
        const quizId = req.params.qid;
        const questionId = req.params.quid;
        const quiz = await quizModel.findById(quizId);
        quiz.questions = quiz.questions.filter(question => question._id != questionId);
        await quiz.save();
        const status = await dao.deleteQuizQuestion(questionId);
        res.json(quiz);
    }

    const findAllQuestions = async (req, res) => {
        const quizId = req.params.qid;
        const quiz = await quizModel.findById(quizId);
        const quizQuestions = await dao.findAllQuizzes(quiz.questions);
        res.json(quizQuestions);
    }

    const findQuestionById = async (req, res) => {
        const questionId = req.params.quid;
        const question = await dao.findQuestionById(questionId);
        res.json(question);
    }

    app.post("/api/quizzes/:qid/questions", createQuestion);
    app.put("/api/quizzes/:qid/questions/:quid", updateQuestion);
    app.delete("/api/quizzes/:qid/questions/:quid", deleteQuestion);
    app.get("/api/quizzes/:qid/questions", findAllQuestions);
    app.get("/api/quizzes/:qid/questions/:quid", findQuestionById);
}

export default QuizQuestionRoutes;