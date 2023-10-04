const mongoose = require('mongoose');
const urlRegular = require('../utils/constans');

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'поле должно быть заполнено'],
    minlength: [2, 'минимальная длина поля name - 2'],
    maxlength: [30, 'максимальная длина поля name - 30'],
  },
  link: {
    type: String,
    required: [true, 'поле должно быть заполнено'],
    validate: {
      validator(v) {
        return urlRegular.test(v);
      },
      message: 'введите url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
