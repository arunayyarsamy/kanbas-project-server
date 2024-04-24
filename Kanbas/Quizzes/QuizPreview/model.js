import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('QuizPreviewModel', schema);
export default model;