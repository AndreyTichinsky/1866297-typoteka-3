"use strict";

const {HttpCode} = require(`../../constants`);
const {dataAsserts: {notEmptyString, notEmptyArray}} = require(`../../utils`);

const articleKeys = [
  `title`,
  `categories`,
  `fullText`,
  `announce`,
];

const articleKeysValidators = {
  title: notEmptyString,
  fullText: notEmptyString,
  categories: notEmptyArray,
  announce: notEmptyString,
};

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));
  const isValidInput = articleKeys.every((key) => {
    return articleKeysValidators[key](newArticle[key]);
  });
  if (!keysExists || !isValidInput) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }
  return next();
};
