"use client";
import React, { useEffect, useState } from "react";
import IntroductionCF from "./_intorductions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FinishScreen from "@/components/game/FinishScreen";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/affective_emphaty/${src}.JPG`;
};

const emotionNamelist = ["AFS", "ANS", "DIS", "HAS", "SAS", "SUS", "NES"];
const genderFolderName = ["Erkek", "Kadın"];
const sexs = ["AM", "AF"];
const personCountPerSex = 15;
const MAXROUND = 52;

const AffectiveEmpathyPage = () => {
  const [round, setRound] = useState(0);
  const [imageString, setImageString] = useState<string[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [samePerson, setSamePerson] = useState<string[]>([]);
  const [allRound1Images, setAllRound1Images] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean | null>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>();

  const handleNext = () => {
    setRound((prev) => prev + 1);
  };

  const handleImageClick = (clickedImage: string) => {
    setSelectedImage(clickedImage);
    if (clickedImage.slice(0, 10) === samePerson[0].slice(0, 10)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setTimeout(handleNext, 1000);
  };

  const selectSamePerson = () => {
    let x = Math.floor(Math.random() * emotionNamelist.length);
    let z = Math.ceil(Math.random() * personCountPerSex);
    let t = Math.floor(Math.random() * genderFolderName.length);
    let y = t === 0 ? 0 : 1;
    let formattedZ = z < 10 ? `0${z}` : `${z}`;
    let imageString = `${genderFolderName[t]}/${sexs[y]}${formattedZ}/${sexs[y]}${formattedZ}${emotionNamelist[x]}`;
    setSamePerson((prev) => [...prev, imageString]);
    let newX;
    do {
      newX = Math.floor(Math.random() * emotionNamelist.length);
    } while (newX === x);
    let newImageString = `${genderFolderName[t]}/${sexs[y]}${formattedZ}/${sexs[y]}${formattedZ}${emotionNamelist[newX]}`;
    setSamePerson((prev) => [...prev, newImageString]);
    setAllRound1Images((prev) => [...prev, newImageString]);
    setTimeout(() => {
      setIsGameStarted(true);
    }, 3000);
  };

  const selectImage = () => {
    let newImageString: string;
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

    setImageString((prev) => [...prev, newImageString]);
    setAllRound1Images((prev) => [...prev, newImageString]);
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setAllRound1Images([]);
    setImageString([]);
    setSelectedCheckboxes([]);
    setSelectedImage("");
    setSamePerson([]);
    setIsGameStarted(false);
    setIsCorrect(null);
    for (let i = 0; i < 1; i++) {
      selectSamePerson();
    }
    for (let i = 0; i < 3; i++) {
      selectImage();
    }

    setAllRound1Images((prev) => shuffleArray(prev));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  return (
    <div>
      {round >= MAXROUND ? (
        <FinishScreen url='/week/2/' />
      ) : round === 0 ? (
        <div className='flex flex-col items-center'>
          <IntroductionCF />
          <Button onClick={handleNext} className='my-5'>
            Hadi Başlayalım
          </Button>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          {isCorrect === true ? (
            <p className=' text-green-600 text-5xl'>Doğru</p>
          ) : isCorrect === false ? (
            <p className=' text-red-600 text-5xl'>Yanlış</p>
          ) : isGameStarted === false ? (
            <Image
              className='rounded-md'
              width={200}
              height={270}
              alt={`${samePerson[0]}`}
              src={samePerson[0]}
              loader={imageLoader}
            />
          ) : (
            <div className='grid grid-cols-4 gap-y-4 gap-x-9 items-center justify-center'>
              {allRound1Images.map((image, index) => (
                <Image
                  className={`rounded-md cursor-pointer ${
                    selectedImage === image && "border-2 border-blue-500"
                  }`}
                  key={index}
                  width={180}
                  height={243}
                  alt={image}
                  src={image}
                  loader={imageLoader}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className=' p-5'>
        {/* <Button onClick={handleCheck} variant={"ghost"}>
              Kontrol et
            </Button> */}
      </div>
    </div>
  );
};

export default AffectiveEmpathyPage;
