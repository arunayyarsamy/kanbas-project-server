import * as dao from "./dao.js";

function QuizPreviewRoutes(app) {

    const previewQuiz = async (req, res) => {
        const quizPreview = await dao.findAttemptWithUsernameAndQuiz(req.session["currentUser"].username, req.params.qid);
        if (quizPreview === null) {
            res.status(206).send("No preview found");
            return;
        }
        res.json(quizPreview);
    }

    app.get("/quizzes/:qid/preview", previewQuiz);
};

export default QuizPreviewRoutes;