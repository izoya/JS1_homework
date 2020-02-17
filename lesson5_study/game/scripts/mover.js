let mover = {

    /**
     * Метод выполняет перемещение игрока по полю.
     * @param {KeyboardEvent} event объект события нажатия клавиши 
     */
    makeStep(event) {
        let newPosition = this.getNewPosition(event);
        //если позиции одинаковые, ничего не делаем
        if (this.arePositionsEqual(player, newPosition)) {
            
            return;
        };
        //если идти некуда, ничего не делаем
        if (!this.canPlayerMakeStep(newPosition)) {
            
            return;
        };
        renderer.clearUserPosition();
        player.changePosition(newPosition);
        renderer.renderUserPosition(newPosition);

    },

    /**
     * Метод возвращает координаты новой ячейки в зависимости от нажатой пользователем стрелки, либо, если туда нельзя сделать шаг, то координаты текущей ячейки.
     * @param {KeyboardEvent} event объект события нажатия клавиши
     * @see https://mzl.la/2DX0Mdp
     * @returns {{x: number, y: number}} 
     */
    getNewPosition(event) {
        switch (event.key) {
            case "ArrowUp":
                return { x: player.x, y: player.y - 1 };
            case "ArrowDown":
                return { x: player.x, y: player.y + 1 };
            case "ArrowLeft":
                return { x: player.x - 1, y: player.y };
            case "ArrowRight":
                return { x: player.x + 1, y: player.y };
            default:
                return { x: player.x, y: player.y };
            
                
        }
    },

    /**
     * Метод проверяет, совпадают ли координаты двух позиций.
     * @param {{x: number, y: number}} curPos текущая позиция
     * @param {{x: number, y: number}} newPos новая позиция
     * @returns {boolean} true, если совпалают, иначе false
     */
    arePositionsEqual(curPos, newPos) {
        return curPos.x == newPos.x && curPos.y == newPos.y;
    },

    /**
     * Метод проверяет существование ячейки, куда хочет перейти пользователь.
     * @param {{x: number, y: number}} nextPoint координаты ячейки 
     * @returns {boolean} true, если ячейка существует, иначе false
     */
    canPlayerMakeStep(nextPoint) {
        return renderer.getSquare(nextPoint) !== null;
    }
};

