import { InfiniteMovingCards } from "./../../../components/ui/infinite-moving-cards";
const emotionNamelist = ["AFS", "ANS", "DIS", "HAS", "SAS", "SUS", "NES"];
const genderFolderName = ["Erkek", "Kadın"];
const sexs = ["AM", "AF"];
const personCountPerSex = 15;

let persons: CurrentPersonType[] = [];
let answer: CurrentPersonType[] = [];

type CurrentPersonType = {
  emotionName: string;
  genderFolder: string;
  sex: string;
  index: number;
};

export function selectImagesFunction() {
  persons = [];
  answer = [];

  let loopCount = 0;

  while (loopCount < 2) {
    let isSamePerson = false;

    while (!isSamePerson) {
      const genderFolder = genderFolderName[Math.floor(Math.random() * 2)];
      const sex = genderFolder === "Erkek" ? sexs[0] : sexs[1];
      const index = Math.floor(Math.random() * personCountPerSex) + 1;
      const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

      const newElement = {
        emotionName,
        genderFolder,
        index,
        sex,
      };

      if (
        !persons.some(
          (item) =>
            item.index === index ||
            item.emotionName === emotionName ||
            item.genderFolder === genderFolder ||
            item.sex === sex
        )
      ) {
        isSamePerson = true;
      }

      if (isSamePerson) {
        persons = [...persons, newElement];
      }
    }

    loopCount++;
  }

  let isDifferent = false;

  while (!isDifferent) {
    const genderFolder = genderFolderName[Math.floor(Math.random() * 2)];
    const sex = genderFolder === "Erkek" ? sexs[0] : sexs[1];
    const index = Math.floor(Math.random() * personCountPerSex) + 1;
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

    const newElement = {
      emotionName,
      genderFolder,
      index,
      sex,
    };

    if (
      !persons.some(
        (item) =>
          item.index === index &&
          item.emotionName === emotionName &&
          item.genderFolder === genderFolder &&
          item.sex === sex
      )
    ) {
      answer = [newElement];
      persons = [...persons, newElement];
      isDifferent = true;
    }
  }

  let isSame = false;

  while (!isSame) {
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];
    const secondElement = {
      emotionName: emotionName,
      genderFolder: answer[0].genderFolder,
      index: answer[0].index,
      sex: answer[0].sex,
    };

    if (answer[0].emotionName !== emotionName) {
      answer = [...answer, secondElement];
      persons = [...persons, secondElement];
      isSame = true;
    }
  }

  return { persons, answer };
}
