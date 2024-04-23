import model from "./model.js";

export const findAllQuizzes = (idList) => model.find({_id: {$in: idList}});

export const findQuestionById = (quizQuestionId) => model.findById(quizQuestionId);

export const createQuizQuestion = (question) => {
    delete question._id;
    return model.create(question);
}

export const updateQuizQuestion = (quizQuestionId, questionData) => model.updateOne({_id: quizQuestionId}, {$set: questionData});

export const deleteQuizQuestion = (quizQuestionId) => model.deleteOne({_id: quizQuestionId});