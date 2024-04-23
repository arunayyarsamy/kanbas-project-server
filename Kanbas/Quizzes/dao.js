import model from "./model.js";

export const createQuiz = (quiz) => {
    delete quiz._id;
    return model.create(quiz);
}

export const findAllQuizzes = () => model.find();

export const findQuizzesForCourse = (courseId) => model.find({courseId: courseId});

export const findQuizById = (quizId) => model.findById(quizId);

export const updateQuiz = (quizId, quizData) => model.updateOne({_id: quizId}, {$set: quizData});

export const deleteQuiz = (quizId) => model.deleteOne({_id: quizId});