const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// check email lenght
let emailLengthChecker = (email) => {
    if (email.length == 0) {
        return false;
    } else {
        if (email.length < 5 || email.length > 40) {
            return false;
        } else {
            return true;
        }
    }
};

//check if email is valid or not
let validEmailChecker = (email) => {
    if (email.length == 0) {
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
};

// check user name length
let usernameLengthChecker = (username) => {
    if (username.length == 0) {
        return false;
    } else {
        if (username.length < 3 || username.length > 20) {
            return false;
        } else {
            return true;
        }
    }
};
//check password length
let passwordLengthChecker = (password) => {
    if (password.length == 0) {
        return false;
    } else {
        if (password.length < 5 || password.length > 40) {
            return false;
        } else {
            return true;
        }
    }

};

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'Email must be at lease 5 characters but no more than 40 characters'
    },
    {
        validator: validEmailChecker,
        message: 'invalid email'
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'username must be at lease 3 characters but no more than 20 characters'
    }
];

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'username must be at lease 6 characters but no more than 20 characters'
    }
];

// for back-end validation for user details 
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
  });

// create middleware to encrypt password in database
userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err)
            return next(err);
        this.password = hash;
        next();
    });
});

// to dycript or compare for login
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);