declare type Game = {
  isCompleted: boolean;
  slug: string;
  week: string;
};

declare type Week2Game4 = {
  question: string;
  correctAnswer: string;
  options: string[];
  ifWrong: string;
};
