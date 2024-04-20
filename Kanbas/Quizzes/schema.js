import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quizType: {
        type: String,
        enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
        default: 'Graded Quiz',
    },
    points: {
        type: Number,
        default: 0,
    },
    assignmentGroup: {
        type: String,
        enum: ['Quizzes', 'Exams', 'Assignments', 'Project'],
        default: 'Quizzes',
    },
    shuffleAnswers: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes',
    },
    timeLimit: {
        type: Number,
        default: 20,
    },
    multipleAttempts: {
        type: String,
        enum: ['No', 'Yes'],
        default: 'No',
    },
    showCorrectAnswers: {
        type: String,
        enum: ['No', 'Yes'],
        default: 'No',
    },
    accessCode: {
        type: String,
        default: '',
    },
    oneQuestionAtATime: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes',
    },
    webcamRequired: {
        type: String,
        enum: ['No', 'Yes'],
        default: 'No',
    },
    lockQuestionsAfterAnswering: {
        type: String,
        enum: ['No', 'Yes'],
        default: 'No',
    },
    dueDate: {
        type: Date,
    },
    availableDate: {
        type: Date,
    },
    untilDate: {
        type: Date,
    },
    published: {
        type: Boolean,
        default: false,
    },
    questions: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'QuizzesQuestionsModel'}
    ]
}, {collection: 'quizzes'});

export default QuizSchema;