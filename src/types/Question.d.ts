declare type Question = {
  id: number;
  title: string;
  answer: 0 | 1 | 2 | 3 | 4;
};

declare type QuestionOne = {
  id: number;
  title: string;
  answer: 0 | 1 | 2 | 3 | 4;
  subType: number;
};

declare type QuestionProgress = {
  locked: boolean;
  progress: number;
};

declare type QuestionTwo = {
  id: number;
  question: string;
  type: 2 | 3 | 4 | 5;
  subType: number | null;
};
