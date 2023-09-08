const {Schema, model} = require('mongoose');
const encrypt = require('mongoose-encryption');

const {SECRET_SENTENCE} = process.env

const userSchema = new Schema({
    username: String,
    password: String
})

userSchema.plugin(encrypt, {secret: SECRET_SENTENCE, encryptedFields: ['password'] })

const User = model('User', userSchema);

module.exports = User;