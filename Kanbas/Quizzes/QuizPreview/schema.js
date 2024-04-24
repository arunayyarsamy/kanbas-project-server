import mongoose from "mongoose";

const QuizPreviewSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizzesModel',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    chosenAnswers: {
        type: Array,
        required: true,
    },
}, {collection: "quizPreview"});

export default QuizPreviewSchema;
