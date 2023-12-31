import { Schema, model } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import { compare, hash } from 'bcrypt';

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      require: true,
    },
    password: String,
    googleId: String,
  },
  { timestamps: true }
);

userSchema.plugin(findOrCreate);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, +process.env.PASSWORD_SALT);
  }
});

userSchema.methods.validatePassword = async function (password) {
  const result = await compare(password, this.password);
  console.log(result);
  return result;
};

const User = model('User', userSchema);

export default User;
