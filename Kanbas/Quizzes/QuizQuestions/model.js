import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('QuizzesQuestionsModel', schema);
export default model;