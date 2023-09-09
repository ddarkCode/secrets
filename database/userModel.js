const {Schema, model} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')
// const encrypt = require('mongoose-encryption');

// const {SECRET_SENTENCE} = process.env

const userSchema = new Schema({
    username: String,
    password: String,
    googleId: String,
    secrets: Array
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)
// userSchema.plugin(encrypt, {secret: SECRET_SENTENCE, encryptedFields: ['password'] })

const User = model('User', userSchema);

module.exports = User;