let mover = {
    /**
     * Получает и отдаёт направление от пользователя.
     * @returns {int} Возвращаем направлеине, введенное пользователем.
     */
    getDirection() {
        const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];
        while (true) {
            let direction = parseInt(prompt('Введите число (1, 2, 3, 4, 6, 7, 8, 9), куда вы хотите переместиться, "Отмена" для выхода.'));
            if (isNaN(direction)) {
                return null;
            }
            if (!availableDirections.includes(direction)) {
                alert('Для перемещения необходимо ввести одно из чисел 1, 2, 3, 4, 6, 7, 8, 9.');
                continue;
            }
            return direction;
        }

    },

    /**
     * Отдает следующую точку, в которой будет находиться пользователь после движения.
     * @param {int} direction Направление движения игрока.
     * @returns {{x: int, y: int}} Следующая позиция игрока.
     */
    getNextPosition(direction) {
        const nextPosition = {
            x: player.x,
            y: player.y
        };
        switch (direction) {
            case 1:
                nextPosition.x--;
            case 2:
                nextPosition.y++;
                break;
            case 7:
                nextPosition.y--;
            case 4:
                nextPosition.x--;
                break;
            case 3:
                nextPosition.y++;
            case 6:
                nextPosition.x++;
                break;
            case 9:
                nextPosition.x++;
            case 8:
                nextPosition.y--;
                break;
        }
        if (nextPosition.x < 0 || nextPosition.x >= config.colsCount ||
            nextPosition.y < 0 || nextPosition.y >= config.rowsCount) {
            nextPosition.x = player.x;
            nextPosition.y = player.y;
            }
        return nextPosition;
    }
}