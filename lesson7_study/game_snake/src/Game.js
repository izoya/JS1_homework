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