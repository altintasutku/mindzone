const fs = require('fs');
const path = require('path');

function moveImagesToQuestions(directory) {
    if (!fs.existsSync(directory) || !fs.lstatSync(directory).isDirectory()) {
        console.log("Belirtilen dizin bulunamadı.");
        return;
    }

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error("Dizin okunamadı:", err);
            return;
        }

        files.forEach((file) => {
            const questionPath = path.join(directory, file);
            if (fs.lstatSync(questionPath).isDirectory()) {
                fs.readdir(questionPath, (err, subFiles) => {
                    if (err) {
                        console.error("Alt dizinler okunamadı:", err);
                        return;
                    }

                    subFiles.forEach((subFile, index) => {
                        const subFilePath = path.join(questionPath, subFile);
                        if (fs.lstatSync(subFilePath).isDirectory()) {
                            const imageFiles = fs.readdirSync(subFilePath).filter((item) => {
                                return item.endsWith('.jpg') || item.endsWith('.JPG');
                            });
                            imageFiles.sort();
                            imageFiles.forEach((imageFile, imageIndex) => {
                                const newImageName = `${index + 1}.jpg`;
                                const newImagePath = path.join(questionPath, newImageName);
                                fs.renameSync(path.join(subFilePath, imageFile), newImagePath);
                                console.log(`${imageFile} -> ${newImageName}`);
                            });
                            fs.rmdirSync(subFilePath);
                        }
                    });
                });
            }
        });
    });
}

const directoryPath = "../public/images/weekGames/week_three/affective_empathy";
moveImagesToQuestions(directoryPath);
