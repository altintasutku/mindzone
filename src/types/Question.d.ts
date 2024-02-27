declare type Question = {
  id: number;
  title: string;
  answer: 0 | 1 | 2 | 3 | 4;
};

declare type QuestionProgress = {
  done: boolean;
  locked: boolean;
  progress: number;
};
