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
  entryPoint?: string;
};

export function selectImagesFunction() {
  persons = [];
  answer = [];

  while (persons.length < 2) {
    const genderFolder = genderFolderName[Math.floor(Math.random() * 2)];
    const index = Math.floor(Math.random() * personCountPerSex) + 1;
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

    if (
      !persons.some(
        (item) =>
          item.index === index ||
          item.emotionName === emotionName ||
          item.genderFolder === genderFolder
      )
    ) {
      persons.push({
        emotionName,
        genderFolder,
        index,
        sex: genderFolder === "Erkek" ? sexs[0] : sexs[1],
        entryPoint: "first"
      })
    }
  }


  while (persons.length < 3) {
    const genderFolder = genderFolderName[Math.floor(Math.random() * 2)];
    const index = Math.floor(Math.random() * personCountPerSex) + 1;
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

    if (
      !persons.some(
        (item) =>
          item.index === index &&
          item.genderFolder === genderFolder
      )
    ) {
      const newElement = {
        emotionName,
        genderFolder,
        index,
        sex: genderFolder === "Erkek" ? sexs[0] : sexs[1],
        entryPoint: "second"
      }
      answer.push(newElement);
      persons.push(newElement);
    }
  }

  while (persons.length < 4) {
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];
    const secondElement = {
      emotionName: emotionName,
      genderFolder: answer[0].genderFolder,
      index: answer[0].index,
      sex: answer[0].sex,
      entryPoint: "third"
    };

    if (answer[0].emotionName !== emotionName) {
      answer.push(secondElement);
      persons.push(secondElement);
    }
  }

  return { persons, answer };
}
