const mounthType = ["closedMounth", "openMounth"];
const sex = ["man", "woman"];
const mod = ["negative", "positive"];

const dataLengths: {
  [key: string]: {
    [key: string]: {
      [key: string]: number;
    };
  };
} = {
  openMounth: {
    man: {
      negative: 23,
      positive: 16,
    },
    woman: {
      negative: 32,
      positive: 16,
    },
  },
  closedMounth: {
    man: {
      negative: 23,
      positive: 16,
    },
    woman: {
      negative: 32,
      positive: 16,
    },
  },
};

export type GameImage = {
  mounthType: string;
  sex: string;
  mod: string;
  index: number;
};

export enum Rule {
  MounthType = "MounthType",
  Sex = "Sex",
  Mod = "Mod",
}

export function generateRound(currentRule: Rule): {
  images: GameImage[];
  roundImage: GameImage;
} {
  if (currentRule === Rule.MounthType) {
    return generateForMounthType();
  } else if (currentRule === Rule.Sex) {
    return generateForSex();
  } else {
    return generateForMod();
  }
}

function generateForSex(): {
  images: GameImage[];
  roundImage: GameImage;
} {
  const arr: GameImage[] = [];

  const selectedSex = sex[Math.floor(Math.random() * sex.length)];

  const randomMounthType =
    mounthType[Math.floor(Math.random() * mounthType.length)];
  const randomMod = mod[Math.floor(Math.random() * mod.length)];
  const randomIndex =
    Math.floor(
      Math.random() * dataLengths[randomMounthType][selectedSex][randomMod]
    ) + 1;

  const roundImage = {
    mounthType: randomMounthType,
    index: randomIndex,
    mod: randomMod,
    sex: selectedSex,
  };

  while (arr.length < 1) {
    const randomMounthType =
      mounthType[Math.floor(Math.random() * mounthType.length)];
    const randomMod = mod[Math.floor(Math.random() * mod.length)];
    const randomIndex =
      Math.floor(
        Math.random() * dataLengths[randomMounthType][selectedSex][randomMod]
      ) + 1;

    if (
      !arr.some(
        (i) =>
          i.mod === randomMod &&
          i.mounthType === randomMounthType &&
          i.index === randomIndex
      )
    ) {
      arr.push({
        mounthType: randomMounthType,
        index: randomIndex,
        sex: selectedSex,
        mod: randomMod,
      });
    }
  }

  while (arr.length < 4) {
    const randomMounthType =
      mounthType[Math.floor(Math.random() * mounthType.length)];
    const randomMod = mod[Math.floor(Math.random() * mod.length)];
    const randomSex = selectedSex === "man" ? "woman" : "man" ;
    const randomIndex =
      Math.floor(
        Math.random() * dataLengths[randomMounthType][randomSex][randomMod]
      ) + 1;

    arr.push({
      mounthType: randomMounthType,
      index: randomIndex,
      sex: randomSex,
      mod: randomMod,
    });
  }

  return {
    images: arr,
    roundImage,
  };
}

function generateForMod(): {
  images: GameImage[];
  roundImage: GameImage;
} {
  const arr: GameImage[] = [];

  const selectedMod = mod[Math.floor(Math.random() * mod.length)];

  const randomMounthType =
    mounthType[Math.floor(Math.random() * mounthType.length)];
  const randomSex = sex[Math.floor(Math.random() * sex.length)];
  const randomIndex =
    Math.floor(
      Math.random() * dataLengths[randomMounthType][randomSex][selectedMod]
    ) + 1;

  const roundImage = {
    mounthType: randomMounthType,
    index: randomIndex,
    sex: randomSex,
    mod: selectedMod,
  };

  while (arr.length < 1) {
    const randomMounthType =
      mounthType[Math.floor(Math.random() * mounthType.length)];
    const randomSex = sex[Math.floor(Math.random() * sex.length)];
    const randomIndex =
      Math.floor(
        Math.random() * dataLengths[randomMounthType][randomSex][selectedMod]
      ) + 1;

    if (
      !arr.some(
        (i) =>
          i.mounthType === randomMounthType &&
          i.sex === randomSex &&
          i.index === randomIndex
      )
    ) {
      arr.push({
        mounthType: randomMounthType,
        index: randomIndex,
        sex: randomSex,
        mod: selectedMod,
      });
    }
  }

  while (arr.length < 4) {
    const randomMounthType =
      mounthType[Math.floor(Math.random() * mounthType.length)];
    const randomSex = sex[Math.floor(Math.random() * sex.length)];
    const randomMode = selectedMod === "positive" ? "negative" : "positive";
    const randomIndex =
      Math.floor(
        Math.random() * dataLengths[randomMounthType][randomSex][randomMode]
      ) + 1;

    arr.push({
      mounthType: randomMounthType,
      index: randomIndex,
      sex: randomSex,
      mod: randomMode,
    });
  }

  return {
    images: arr,
    roundImage,
  };
}

function generateForMounthType(): {
  images: GameImage[];
  roundImage: GameImage;
} {
  const arr: GameImage[] = [];

  const selectedMounthType =
    mounthType[Math.floor(Math.random() * mounthType.length)];

  const randomSex = sex[Math.floor(Math.random() * sex.length)];
  const randomMod = mod[Math.floor(Math.random() * mod.length)];
  const randomIndex =
    Math.floor(
      Math.random() * dataLengths[selectedMounthType][randomSex][randomMod]
    ) + 1;

  const roundImage = {
    mounthType: selectedMounthType,
    index: randomIndex,
    sex: randomSex,
    mod: randomMod,
  };

  while (arr.length < 1) {
    const randomSex = sex[Math.floor(Math.random() * sex.length)];
    const randomMod = mod[Math.floor(Math.random() * mod.length)];
    const randomIndex =
      Math.floor(
        Math.random() * dataLengths[selectedMounthType][randomSex][randomMod]
      ) + 1;

    if (
      !arr.some(
        (i) =>
          i.mod === randomMod && i.sex === randomSex && i.index === randomIndex
      )
    ) {
      arr.push({
        mounthType: selectedMounthType,
        index: randomIndex,
        sex: randomSex,
        mod: randomMod,
      });
    }
  }

  while (arr.length < 4) {
    const randomSex = sex[Math.floor(Math.random() * sex.length)];
    const randomMod = mod[Math.floor(Math.random() * mod.length)];
    const randomMounthType =
      selectedMounthType === "openMounth" ? "closedMounth" : "openMounth";
    const randomIndex =
      Math.floor(
        Math.random() * dataLengths[randomMounthType][randomSex][randomMod]
      ) + 1;

    arr.push({
      mounthType: randomMounthType,
      index: randomIndex,
      mod: randomMod,
      sex: randomSex,
    });
  }
  return {
    images: arr,
    roundImage,
  };
}
