"use strict";

const Joi = require(`joi`);
const {HttpCode} = require(`../../constants`);

const ErrorArticleMessage = {
  CATEGORIES: `Не выбрана ни одна категория публикации`,
  TITLE_MIN: `Заголовок содержит меньше 30 символов`,
  TITLE_MAX: `Заголовок не может содержать более 250 символов`,
  ANNOUNCE_MIN: `Анонс содержит меньше 30 символов`,
  ANNOUNCE_MAX: `Анонс не может содержать более 250 символов`,
  FULL_TEXT_MIN: `Текст публикации не может быть пустым`,
  FULL_TEXT_MAX: `Текст публикации не может содержать более 1000 символов`,
  PHOTO: `Тип изображения не поддерживается`,
};

const imageRegexp = /.*\.(jpeg|jpg|png)$/;

const schema = Joi.object({
  categories: Joi.array().items(
      Joi.number().integer().positive().messages({
        'number.base': ErrorArticleMessage.CATEGORIES
      })
  ).min(1).required(),
  title: Joi.string().min(30).max(250).required().messages({
    "string.empty": ErrorArticleMessage.TITLE_MIN,
    "string.min": ErrorArticleMessage.TITLE_MIN,
    "string.max": ErrorArticleMessage.TITLE_MAX,
  }),
  announce: Joi.string().min(30).max(250).required().messages({
    "string.empty": ErrorArticleMessage.ANNOUNCE_MIN,
    "string.min": ErrorArticleMessage.ANNOUNCE_MIN,
    "string.max": ErrorArticleMessage.ANNOUNCE_MAX,
  }),
  photo: Joi.string()
    .optional()
    .allow(``)
    .pattern(new RegExp(imageRegexp))
    .messages({
      "string.pattern.base": ErrorArticleMessage.PHOTO,
    }),
  fullText: Joi.string().min(1).max(1000).required().messages({
    "string.empty": ErrorArticleMessage.FULL_TEXT_MIN,
    "string.min": ErrorArticleMessage.FULL_TEXT_MIN,
    "string.max": ErrorArticleMessage.FULL_TEXT_MAX,
  }),
});

module.exports = (req, res, next) => {
  const newArticle = req.body;

  const {error} = schema.validate(newArticle, {abortEarly: false});

  if (error) {
    return res
        .status(HttpCode.BAD_REQUEST)
        .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
