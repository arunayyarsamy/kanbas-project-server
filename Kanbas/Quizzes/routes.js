import * as dao from "./dao.js";

function QuizRoutes(app) {

    const getAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    }

    const getQuizzesForCourse = async (req, res) => {
        const quizzes = await dao.findQuizzesForCourse(req.params.cid);
        res.json(quizzes);
    }

    const getQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.qid);
        res.json(quiz);
    }

    const createQuiz = async (req, res) => {
        var quizData = req.body;
        quizData = {...quizData, courseId: req.params.cid}
        const quiz = await dao.createQuiz(req.body);
        res.send(quiz);
    }

    const updateQuiz = async (req, res) => {
        const status = await dao.updateQuiz(req.params.qid, req.body);
        if (status.modifiedCount === 0) {
            res.status(406).send("Quiz not editable");
        }
        const quiz = await dao.findQuizById(req.params.qid);
        res.json(quiz);
    }

    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    }

    const publishQuiz = async (req, res) => {
        const publishStatus = req.body.published;
        const status = await dao.updateQuiz(req.params.qid, {published: publishStatus});
        res.json(status);
    }

    app.get("/api/quizzes", getAllQuizzes);
    app.get("/api/courses/:cid/quizzes", getQuizzesForCourse);
    app.get("/api/quizzes/:qid", getQuizById);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.put("/api/quizzes/:qid/publish", publishQuiz);
}

export default QuizRoutes;