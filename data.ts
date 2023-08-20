import { faker } from "@faker-js/faker";

const hexGenerator = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

// export const data = Array.from({ length: 10 }, () => ({
//   id: faker.number.int({ min: 10, max: 10000000 }),
//   color: hexGenerator(),
//   duration: faker.number.int({ min: 0, max: 10 }),
// }));

export const oldData = [
  {
    question:
      "Which of the following acts as the input of a class-based component?",
    answers: ["Class", "Factory", "Render", "Props"],
    correct: "Props",
  },
  {
    question:
      "Which of the following keyword is used to create a class inheritance?",
    answers: ["Create", "Inherits", "Extends", "This"],
    correct: "Extends",
  },
  {
    question: "What is a state in React?",
    answers: [
      "A permament storage",
      "An internal storage of a component",
      "An external storage of a component",
      "None of the above",
    ],
    correct: "An internal storage of a component",
  },
];

export const data = oldData.map((item, index) => ({
  ...item,
  id: faker.number.int({ min: 10, max: 10000000 }),
  color: hexGenerator(),
}));
