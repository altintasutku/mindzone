import { all } from "axios";

const emotionNamelist = ["AFS", "ANS", "DIS", "HAS", "SAS", "SUS", "NES"];
const genderFolderName = ["Erkek", "Kadın"];
const sexs = ["AM", "AF"];
const personCountPerSex = 15;

export function generateImages() {
  let allRound1Images: string[] = [];

  let samePersonArray = [];

  // Aynı kişiden 2 resim seç

  let x = Math.floor(Math.random() * emotionNamelist.length);
  let z = Math.ceil(Math.random() * personCountPerSex);
  let t = Math.floor(Math.random() * genderFolderName.length);
  let y = t === 0 ? 0 : 1;
  let formattedZ = z < 10 ? `0${z}` : `${z}`;
  let sameImageString = `${genderFolderName[t]}/${sexs[y]}${formattedZ}/${sexs[y]}${formattedZ}${emotionNamelist[x]}`;
  samePersonArray.push(sameImageString);

  let newX;
  do {
    newX = Math.floor(Math.random() * emotionNamelist.length);
  } while (newX === x);
  let newSameImageString = `${genderFolderName[t]}/${sexs[y]}${formattedZ}/${sexs[y]}${formattedZ}${emotionNamelist[newX]}`;
  samePersonArray.push(newSameImageString);

  allRound1Images.push(newSameImageString);

  // 3 farklı resim seç

  let selectedImages = [];

  for (let i = 0; i < 3; i++) {
    let newImageString = "";
    let isUnique = false;

    while (!isUnique) {
      let x = Math.floor(Math.random() * emotionNamelist.length);
      let z = Math.ceil(Math.random() * personCountPerSex);
      let t = Math.floor(Math.random() * genderFolderName.length);
      let y = t === 0 ? 0 : 1;
      let formattedZ = z < 10 ? `0${z}` : `${z}`;
      newImageString = `${genderFolderName[t]}/${sexs[y]}${formattedZ}/${sexs[y]}${formattedZ}${emotionNamelist[x]}`;

      // Yeni imageString listedeki diğer imageString'lerle eşleşmiyor mu kontrol et
      isUnique = !allRound1Images.some(
        (item) => item.slice(0, 10) === newImageString.slice(0, 10)
      );
    }
    allRound1Images.push(newImageString);
  }

  return { allRound1Images, samePersonArray };
}
