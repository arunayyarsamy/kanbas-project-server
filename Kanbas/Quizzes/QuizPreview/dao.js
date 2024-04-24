import model from "./model.js";

export const findAttemptWithUsernameAndQuiz = (username, quizId) => {
    return model.findOne({username: username, quizId: quizId});
}

export const createAttempt = (attempt) => {
    return model.create(attempt);
}