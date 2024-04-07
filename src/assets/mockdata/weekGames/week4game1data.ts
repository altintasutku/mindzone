const fileLength = 6;

const emotions = ["angry", "disgust", "fear", "happy", "sad", "neutral"];

export type GameImage = {
  emotion: string;
  index: number;
};

const allData: GameImage[] = [];

emotions.forEach((emotion) => {
  Array.from({ length: fileLength }).forEach((_, index) => {
    allData.push({
      emotion,
      index: index + 1,
    } as GameImage);
  });
});

export const data = allData.sort(() => Math.random() - 0.5);
