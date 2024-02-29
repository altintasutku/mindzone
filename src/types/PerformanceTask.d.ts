declare type PerformanceTaskProgress = {
  done: boolean;
  locked: boolean;
  progress: number;
};

declare type TestFiveQuestion = {
  path: string;
  answers: string[];
  correctAnswer: number;
};
