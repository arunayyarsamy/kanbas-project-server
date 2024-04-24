import * as dao from "./dao.js";
import * as quizQuestionsDao from "./QuizQuestions/dao.js";
import * as quizPreviewDao from "./QuizPreview/dao.js";

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
            return;
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

    const submitQuiz = async (req, res) => {
        // const quizId = req.params.qid;
        const chosenAnswersData = req.body;
        let score = 0;
        for (let i = 0; i < chosenAnswersData.length; i++) {
            const question = await quizQuestionsDao.findQuestionById(chosenAnswersData[i]._id);
            if (JSON.stringify(question.answer) === JSON.stringify(chosenAnswersData[i].chosenAnswer)) {
                score += question.points;
            }
        }
        const username = req.session["currentUser"] !== undefined ? req.session["currentUser"].username : "anonymous";
        console.log(req.session["currentUser"]);
        let quizPreview = null;
        if(username !== "anonymous") {
            quizPreview = await quizPreviewDao.findAttemptWithUsernameAndQuiz(username, req.params.qid);
        }
        if(quizPreview !== null) {
            res.status(206).send("Quiz already submitted");
            return;
        }
        await quizPreviewDao.createAttempt({
            quizId: req.params.qid,
            username: username,
            score: score,
            chosenAnswers: req.body
        });
        res.json({score: score});
    }

    app.get("/api/quizzes", getAllQuizzes);
    app.get("/api/courses/:cid/quizzes", getQuizzesForCourse);
    app.get("/api/quizzes/:qid", getQuizById);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.put("/api/quizzes/:qid/publish", publishQuiz);
    app.post("/api/quizzes/:qid/submit", submitQuiz);
}

export default QuizRoutes;