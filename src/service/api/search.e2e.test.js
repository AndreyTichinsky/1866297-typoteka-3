'use strict';
const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    comments: [
      {
        id: `K9fi_n`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Это где ж такие красоты? Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {
        id: `VY6LaU`,
        text: `Плюсую, но слишком много буквы!`,
      },
      {
        id: `h6xOXi`,
        text: `Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Плюсую, но слишком много буквы! Совсем немного...`,
      },
    ],
    id: `04addx`,
    title: `Что такое золотое сечение`,
    createdDate: `2021-11-21T12:20:03.495Z`,
    announce:
      `Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText:
      `Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой.`,
    category: [
      `IT`,
      `Деревья`,
      `Разное`,
      `Кино`,
      `Железо`,
      `Без рамки`,
      `Программирование`,
      `За жизнь`,
    ],
  },
  {
    comments: [
      {
        id: `GJv8Rc`,
        text: `Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`,
      },
      {
        id: `CAIqTP`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-) Совсем немного... Согласен с автором! Это где ж такие красоты?`,
      },
      {
        id: `6b-PcP`,
        text: `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Это где ж такие красоты? Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Согласен с автором!`,
      },
      {
        id: `ycMTC5`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
    ],
    id: `T60hW0`,
    title: `Как начать программировать`,
    createdDate: `2021-10-26T02:27:42.674Z`,
    announce:
      `Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения.`,
    fullText:
      `Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    category: [`Разное`, `Деревья`],
  },
  {
    comments: [
      {
        id: `THfr1v`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Это где ж такие красоты? Согласен с автором! Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Совсем немного... Мне кажется или я уже читал это где-то?`,
      },
      {
        id: `5fDaLh`,
        text: `Хочу такую же футболку :-) Планируете записать видосик на эту тему?`,
      },
    ],
    id: `6R_ij_`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2021-11-18T03:42:15.761Z`,
    announce: `Он написал больше 30 хитов.`,
    fullText:
      `Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [
      `IT`,
      `Кино`,
      `За жизнь`,
      `Без рамки`,
      `Программирование`,
      `Железо`,
      `Деревья`,
      `Музыка`,
    ],
  },
  {
    comments: [
      {
        id: `aYSBCp`,
        text: `Хочу такую же футболку :-) Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Согласен с автором! Совсем немного... Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `V3G-8j`,
        text: `Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то?`,
      },
    ],
    id: `xBnxl9`,
    title: `Рок — это протест`,
    createdDate: `2021-11-23T01:01:07.723Z`,
    announce:
      `Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения.`,
    fullText:
      `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    category: [
      `Железо`,
      `IT`,
      `Музыка`,
      `За жизнь`,
      `Программирование`,
      `Разное`,
    ],
  },
  {
    comments: [
      {
        id: `H9fndS`,
        text: `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Хочу такую же футболку :-) Это где ж такие красоты? Мне кажется или я уже читал это где-то? Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {
        id: `sChD8s`,
        text: `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Это где ж такие красоты?`,
      },
    ],
    id: `uVdC2d`,
    title: `Как перестать беспокоиться и начать жить`,
    createdDate: `2021-09-30T12:11:56.847Z`,
    announce:
      `Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    fullText:
      `Программировать не настолько сложно, как об этом говорят. Как начать действовать? Для начала просто соберитесь. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    category: [`За жизнь`, `Музыка`, `Программирование`, `Кино`],
  },
];

const createAPI = () => {
  const app = express();
  app.use(express.json());
  search(app, new DataService(mockData));
  return app;
};

describe(`API возвращает результат поиска на основании поискового запроса`, () => {
  let response;
  const app = createAPI();

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `Как начать программировать`,
    });
  });
  test(`Статус код 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 публикация найдена`, () => expect(response.body.length).toBe(1));
  test(`У публикации корректный id`, () =>
    expect(response.body[0].id).toBe(`T60hW0`));
});

test(`API возвращает 404 если ничего не найдено`,
    () => {
      const app = createAPI();
      request(app)
        .get(`/search`)
        .query({
          query: `Как пасти котов`
        })
        .expect(HttpCode.NOT_FOUND);
    }
);

test(`API возвращает 400 в случае отсутствия строки query`,
    () => {
      const app = createAPI();
      request(app)
        .get(`/search`)
        .expect(HttpCode.BAD_REQUEST);
    }
);
