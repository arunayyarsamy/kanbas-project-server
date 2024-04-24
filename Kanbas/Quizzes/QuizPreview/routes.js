import * as dao from "./dao.js";

function QuizPreviewRoutes(app) {

    const previewQuiz = async (req, res) => {
        const username = req.session["currentUser"] !== undefined ? req.session["currentUser"].username : "anonymous";
        // const quizPreview = await dao.findAttemptWithUsernameAndQuiz(req.session["currentUser"].username, req.params.qid);
        const quizPreview = await dao.findAttemptWithUsernameAndQuiz(username, req.params.qid);
        if (quizPreview === null) {
            res.status(206).send("No preview found");
            return;
        }
        res.json(quizPreview);
    }

    app.get("/api/quizzes/:qid/preview", previewQuiz);
};

export default QuizPreviewRoutes;