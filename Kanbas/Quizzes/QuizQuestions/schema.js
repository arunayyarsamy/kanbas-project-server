import mongoose from "mongoose";

const QuizQuestionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    question: {
        type: String,
    },
    choices: {
        type: Array,
        default: [],
    },
    questionType: {
        type: String,
        enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
        default: 'Multiple Choice',
    },
    answer: {
        type: Array,
        default: [],
    },
}, {collection: "quizQuestions"});

export default QuizQuestionsSchema;
