class Board {
    constructor() {
        this.boardEl = document.getElementById('game');
    }

    /**
     * Метод получает другие игровые объекты,
     * которые нужны ему для работы.
     * @param settings {Settings} объект настроек
     * @param snake {Snake} объект змейки
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }


    renderBoard() {
        this.boardEl.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake() {
        let snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        snakeBodyElems.forEach(function (tdEl) {
            tdEl.classList.add('snakeBody');
        });
    }

    clearBoard() {
        const tdElems = document.querySelectorAll('td');
        tdElems.forEach((td) => td.className = "");
    }

    renderFood(coords) {
        const foodCell = this.getCellEl(coords.x, coords.y);
        foodCell.classList.add('food');
    }


    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y);
                bodyElems.push(elem);
            }
            return bodyElems;
        }
        throw new Error('Объект змейки нулевой длины или не существует.');
    }

    /* Метод не нужен, если нет стен
    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        return nextCell === null;
    }
    */

    isNextStepToBody(nextCellCoords) {
        if (this.snake.body.length > 1) {
            for (let i = 1; i < this.snake.body.length; i++) {
                if (this.snake.body[i].x === nextCellCoords.x && this.snake.body[i].y === nextCellCoords.y) {
                    return true;
                    break;
                }
            }
        }
    }

    /**
     * Метод возвращает ссылку на ячейку по указанным координатам
     * @param {int} x, y - координаты ячейки
     * @returns {HTMLElement} - ссылка на ячейку
     */
    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    isHeadOnFood() {
        return this.boardEl.querySelector('.food').classList.contains('snakeBody');
    }

}