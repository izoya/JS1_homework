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