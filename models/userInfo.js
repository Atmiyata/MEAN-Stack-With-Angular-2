const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// for back-end validation for user details 
const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    name: { type: String, lowercase: true },
    dob: { type: String },
    gender: { type: String },
    primaryOccupation: { type: String },
    secondaryOccupation: { type: String },
    skills: { type: Array },
    phone: { type: String },
    email:{type:String},
    languageKnown: { type: Array },
    workExperience: { type: String },
    overview: { type: String }
});

module.exports = mongoose.model('UserInfo', userSchema);