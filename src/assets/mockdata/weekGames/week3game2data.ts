export enum Rules {
    sex = "sex",
    mod = "mod",
}

export const datas = {
    man: {
        positive: 16,
        negative: 31
    },
    woman: {
        positive: 16,
        negative: 32
    }
}

export type GameImage = { sex: string, mod: string, number: number }

export const allData: GameImage[] = [
    ...Array.from({length: datas.man.positive}).map((_, idx): GameImage =>
        ({
                sex: "Erkek",
                mod: "Olumlu",
                number: idx + 1
            }
        )),
    ...Array
        .from({length: datas.man.negative}).map((_, idx): GameImage =>
            ({
                    sex: "Erkek",
                    mod: "Olumsuz",
                    number: idx + 1
                }
            )),
    ...Array
        .from({length: datas.woman.positive}).map((_, idx): GameImage =>
            ({
                    sex: "Kadın",
                    mod: "Olumlu",
                    number: idx + 1
                }
            )),
    ...Array
        .from({length: datas.woman.negative}).map((_, idx): GameImage =>
            ({
                sex: "Kadın",
                mod: "Olumsuz",
                number: idx + 1
            }))
].sort(() => Math.random() - 0.5); // shuffle

export function generateAnswers(rule: Rules,currentData: GameImage) {
    let cloned = [...allData];
    const answers: GameImage[] = [];

    while (answers.length < 3) {
        const randomIndex = Math.floor(Math.random() * cloned.length);
        const random = cloned[randomIndex];
        if (rule === Rules.sex && random.sex !== currentData.sex){
            answers.push(random);
            cloned.splice(randomIndex, 1);
        }else if (rule === Rules.mod && random.mod !== currentData.mod){
            answers.push(random);
            cloned.splice(randomIndex, 1);
        }
    }

    let lastArr: GameImage[] = []

    if (rule === Rules.sex){
        lastArr = cloned.filter(data => {
            return data.sex === currentData.sex
        })
    }else if (rule === Rules.mod){
        lastArr = cloned.filter(data => data.mod === currentData.mod)
    }

    const lastRandomIndex = Math.floor(Math.random() * lastArr.length);
    const lastRandom = lastArr[lastRandomIndex];
    answers.push(lastRandom);

    return answers.sort(() => Math.random() - 0.5);
}