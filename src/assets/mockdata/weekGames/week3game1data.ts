const mods = [
  "İğrenmiş",
  "Kızgın",
  "Korkmuş",
  "Mutlu",
  "Nötr",
  "Şaşırmış",
  "Üzgün",
];

const sexs = ["Erkek", "Kadın"];

const lengthOfData: {
  [key: string]: {
    man: number;
    woman: number;
  };
} = {
  discusting: {
    man: 125,
    woman: 123,
  },
  angry: {
    man: 73,
    woman: 95,
  },
  scared: {
    man: 107,
    woman: 115,
  },
  happy: {
    man: 91,
    woman: 91,
  },
  notr: {
    man: 107,
    woman: 123,
  },
  surprised: {
    man: 143,
    woman: 175,
  },
  sad: {
    man: 175,
    woman: 175,
  },
};

export interface GameImage {
  mod: string;
  sex: string;
  index: number;
}

export const levels: GameImage[][] = [];

const createNewLevel = (): GameImage[] => {
  const level: GameImage[] = [];

  for (let i = 0; i < 2; i++) {
    const randomModIndex = Math.floor(Math.random() * mods.length);
    const mod = mods[randomModIndex];
    const randomSexIndex = Math.floor(Math.random() * sexs.length);
    const sex = sexs[randomSexIndex];

    const index =
      Math.floor(
        Math.random() *
          (randomSexIndex === 0
            ? lengthOfData[Object.keys(lengthOfData)[randomModIndex]].man
            : lengthOfData[Object.keys(lengthOfData)[randomModIndex]].woman)
      ) + 1;

    if (level.find((item) => item.mod === mod)) {
      i--;
      continue;
    }

    level.push({
      mod,
      sex,
      index,
    });
  }

  for (let i = 0; i < 2; i++) {
    const randomModIndex = Math.floor(Math.random() * mods.length);
    const mod = mods[randomModIndex];
    const randomSexIndex = Math.floor(Math.random() * sexs.length);
    const sex = sexs[randomSexIndex];

    const index =
      Math.floor(
        Math.random() *
          (randomSexIndex === 0
            ? lengthOfData[Object.keys(lengthOfData)[randomModIndex]].man
            : lengthOfData[Object.keys(lengthOfData)[randomModIndex]].woman)
      ) + 1;

    if (level.length === 2 && level.find((item) => item.mod === mod)) {
      i--;
      continue;
    }

    if (level.length === 3 && level[2].mod !== mod) {
      i--;
      continue;
    }

    level.push({
      mod,
      sex,
      index,
    });
  }

  return level.sort(() => Math.random() - 0.5);
};

for (let i = 0; i < 300; i++) {
  levels.push(createNewLevel());
}
