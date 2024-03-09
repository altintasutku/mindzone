type Level = {
  directorSays: string;
  gameMap: GameNode[][];
  answer: [number, number];
};

type GameNode = {
  value: Image | null;
  size: string;
  isShowing: boolean;
};

type Image = {
  name: string;
  path: string;
};

const images: Image[] = [
  {
    name: "Elma",
    path: "Apple",
  },
  {
    name: "Araba",
    path: "Car",
  },
  {
    name: "İnek",
    path: "Cow",
  },
  {
    name: "Ördek",
    path: "Duck",
  },
  {
    name: "Traktör",
    path: "Tractor",
  },
];

const sizes = ["Küçük", "Büyük"];

export const levels: Level[] = [];

const answerCoordinates: [number, number][] = [
  [3, 1],
  [1, 2],
  [2, 3],
  [0, 0],
  [2, 1],
  [3, 2],
  [1, 3],
  [0, 1],
  [3, 3],
  [2, 0],
  [0, 2],
  [3, 0],
  [2, 2],
  [1, 1],
  [0, 3],
  [3, 1],
  [1, 2],
  [2, 3],
  [0, 0],
  [2, 1],
];

for (let i = 0; i < 20; i++) {
  const randomPhoto: Image = getRandomPhoto(); // Rastgele bir harf seç
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)]; // Rastgele bir boyut seç
  const directorSays = `Resimdeki ${randomSize} ${randomPhoto.name} bulunuz.`; // Yönetmenin söyleyeceği cümle
  const newLevel: Level = {
    directorSays: directorSays,
    gameMap: generateRandomMap(answerCoordinates[i], randomPhoto, randomSize),
    answer: answerCoordinates[i],
  };
  levels.push(newLevel);
}

function generateRandomMap(
  answerCoordinate: [number, number],
  randomPhoto: Image,
  randomSize: string
): GameNode[][] {
  const map: GameNode[][] = [];
  for (let i = 0; i < 4; i++) {
    const row: GameNode[] = [];
    for (let j = 0; j < 4; j++) {
      const isAnswerCell =
        i === answerCoordinate[0] && j === answerCoordinate[1];
      const shouldHaveValue = isAnswerCell || Math.random() < 0.4;
      const value = shouldHaveValue
        ? isAnswerCell
          ? randomPhoto
          : getRandomPhoto()
        : null;
      const size = shouldHaveValue
        ? isAnswerCell
          ? randomSize
          : sizes[Math.floor(Math.random() * sizes.length)]
        : "";
      const shouldShow = isAnswerCell
        ? true
        : value?.name === randomPhoto.name
        ? false
        : Math.random() > 0.5;
      row.push({ value, size, isShowing: shouldShow });
    }
    map.push(row);
  }
  return map;
}

function getRandomPhoto(): Image {
  return images[Math.floor(Math.random() * images.length)];
}
