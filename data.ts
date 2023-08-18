import { faker } from "@faker-js/faker";

const hexGenerator = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

export const data = Array.from({ length: 10 }, () => ({
  id: faker.number.int({ min: 10, max: 10000000 }),
  color: hexGenerator(),
  duration: faker.number.int({ min: 0, max: 10 }),
}));
