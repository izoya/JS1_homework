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