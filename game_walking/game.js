let game = {
    /**
     * Запускает игру
     */
    run() {
        while (true) {
            // Получаем направление от игрока.
            const direction = mover.getDirection();
            if (direction === null) {
                console.log('Игра окончена');
                return;
            }
            const nextPoint = mover.getNextPosition(direction);
            renderer.clear();
            player.move(nextPoint);
            renderer.render();
        }

    },

    // Выполняется при открытии страницы
    init() {
        console.log('Ваше положение на поле в виде "O".');
        renderer.render();
        console.log('Чтобы начать игру, наберите game.run() и нажмите Enter.');

    }
};

game.init();