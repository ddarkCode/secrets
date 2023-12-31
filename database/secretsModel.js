import { Schema, model } from 'mongoose';

const secretsSchema = new Schema(
  {
    secret: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    replies: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default model('Secret', secretsSchema);
