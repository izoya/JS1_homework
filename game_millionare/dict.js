'use strict';

/**
 * Класс создаёт объект вопроса.
 * @param {string} question Текст вопроса
 * @param {string} a Правильный ответ
 * @param {string} b, c, d Неправильные ответы
 * @property isCorrect
 */
class Question {
    constructor(question, a, b, c, d) {
        this.question = question;
        this.answers = [
            {
                ansText: a,
                correct: true
            },
            {
                ansText: b,
                correct: false
            },
            {
                ansText: c,
                correct: false
            },
            {
                ansText: d,
                correct: false
            }
        ]
    }

    get outputQuestion() {
        let resultText = this.question + "\n\n";
        const letters = ["a", "b", "c", "d"];
        const order = [1, 2, 3, 4].reverse();
        let correct = '';
        for (let i = 0; i < this.answers.length; i++) {
            let random = Math.random() * 4;
            resultText += letters[i] + ": " + this.answers[i].ansText + "\n"; 
        }
        return {
            formattedQuestion: resultText,
            correctAnswer: correct
        }
    }
}

const questionArr = [];
questionArr.push(new Question("Вода камень ...", "точит", "мочит", "моет", "украшает"));
questionArr.push(new Question("Копейка рубль...", "бережёт", "хранит", "сжигает","составляет"));
questionArr.push(new Question("Друг познаётся ...", "в беде", "в беседе", "в битве","со временем"));
questionArr.push(new Question("Кому война, а кому ...", "мать родна", "пряники", "пить до дна", "мир"));
questionArr.push(new Question("Бери в работе умом, а не ...", "горбом", "впахивай", "руками","чашкой кофе"));
console.log(questionArr);

console.log(questionArr[3].outputQuestion);

