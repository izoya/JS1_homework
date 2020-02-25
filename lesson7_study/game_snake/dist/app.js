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
class Food {
    constructor() {
        this.x = null;
        this.y = null;
    }

    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    setNewFood() {
        const food = this.generateRandomCoords();
        this.board.renderFood(food);
    }

    setFood() {
        this.board.renderFood(this);
    }

    generateRandomCoords() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;

            let cell = this.board.getCellEl(this.x, this.y);

            if (cell.classList.contains('snakeBody')) continue;
            /** TODO return cell ? */
            return this;
        }
    }


}
class Game {
    constructor() {
        this.tickId = null;
        this.messageEl = document.getElementById('message');
    }

    init(settings, snake, board, food, menu, status) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
        this.food = food;
        this.menu = menu;
        this.status = status;
    }

    run() {
        // bind() закрепляет this для вызываемой функции, в данном случае this - это объект Game
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickId = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickId);
        }
    }

    /**
     * Метод запускается по интервалу и осуществляет:
     * 1. Перемещение змейки
     * 2. Проверку на конец игры
     * 3. Увеличение размераа змейки, если она съела еду
     * 4. Отрисовку заново змейки и еды
     */
    doTick() {
        this.snake.performStep();
        if (this.isGameLost()) {
            return;
        }
        if (this.isGameWon()) {
            return;
        }
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.status.increaseCount();
            this.status.setCount();
            this.food.setNewFood();
        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
    }

    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
        }
    }

    isGameLost() {
        //if (this.board.isNextStepToWall(this.snake.body[0])) {

        if (this.board.isNextStepToBody(this.snake.body[0])) {
            clearInterval(this.tickId);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }

    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickId);
            this.setMessage('Вы выиграли');
            return true;
        }
        return false;
    }

    setMessage(text) {
        this.messageEl.innerText = text;
    }


}
window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const food = new Food();
    const game = new Game();
    const menu = new Menu();

    settings.init({speed: 3, winLength: 10});
    board.init(settings, snake);
    food.init(settings, snake, board);
    game.init(settings, snake, board, food, menu, status);
    snake.init(settings);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();
    game.run();
});
//# sourceMappingURL=maps/app.js.map
class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }


}


class Settings {
    /**
     *
     * @param params {Object} - Параметры игры
     * @param params.rowsCount {number} - Кол-во строк игрового поля
     * @param params.colsCount {number} - Кол-во колонок игрового поля
     * @param params.speed {number} - Скорость змейки
     * @param params.winLength {number} - Длина змейки, чтобы выиграть
     * @throws {Error} - Ошибка при передаче неверных настроек
     */
    init(params) {
        let defaultParams = {rowsCount: 21, colsCount: 21, speed: 2, winLength: 50};
        Object.assign(defaultParams, params);

        if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 30) {
            throw new Error('Неверные настройки, rowsCount должен быть в диапазоне от 10 до 30');
        }
        this.rowsCount = defaultParams.rowsCount;

        if (defaultParams.colsCount < 10 || defaultParams.colsCount > 30) {
            throw new Error('Неверные настройки, colsCount должен быть в диапазоне от 10 до 30');
        }
        this.colsCount = defaultParams.colsCount;

        if (defaultParams.speed < 1 || defaultParams.speed > 10) {
            throw new Error('Неверные настройки, speed должен быть в диапазоне от 1 до 10');
        }
        this.speed = defaultParams.speed;

        if (defaultParams.winLength < 5 || defaultParams.winLength > 50) {
            throw new Error('Неверные настройки, winLength должен быть в диапазоне от 5 до 50');
        }
        this.winLength = defaultParams.winLength;
    }
};
class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.body = [
            {
                x: 1,
                y: 1
            }
        ];
        this.direction = 'down';
    }

    init(settings) {
        this.settings = settings;
    }

    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано неверное направление (' + newDirection + ').');
        }
        if (this.isPassedOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    performStep() {
        let currentHeadCoords = this.body[0];
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y
        };
        switch (this.direction) {
            case "down":
                newHeadCoords.y++;
                break;
            case "up":
                newHeadCoords.y--;
                break;
            case "left":
                newHeadCoords.x--;
                break;
            case "right":
                newHeadCoords.x++;
                break;
        }
        if (newHeadCoords.x < 1) newHeadCoords.x = this.settings.colsCount;
        if (newHeadCoords.y < 1) newHeadCoords.y = this.settings.rowsCount;
        if (newHeadCoords.x > this.settings.colsCount) newHeadCoords.x = 1;
        if (newHeadCoords.y > this.settings.rowsCount) newHeadCoords.y = 1;

        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    increaseBody() {
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {
            x: bodyLastCell.x,
            y: bodyLastCell.y
        };
        /** TODO А почему сразу bodyLastCell не вставить в массив? */
        this.body.push(newBodyLastCell);
    }
}
/** Здесь хранится статус игры: играем, пауза, завершено. */

class Status {
    constructor() {
        this.setPaused();
        this.count = 1;
        this.countEl = document.querySelector('#count b');
    }

    setPlaying() {
        this.condition = 'playing';
    }

    setPaused() {
        this.condition = 'paused';
    }

    isPlaying() {
        return this.condition === 'playing';
    }

    isPaused() {
        return this.condition === 'paused';
    }

    increaseCount() {
        return this.count++;
    }

    setCount() {
        this.countEl.innerText = this.count;
    }
}
//# sourceMappingURL=maps/app.js.map
