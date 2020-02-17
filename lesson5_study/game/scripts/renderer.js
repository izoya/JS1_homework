let renderer = {
    /**
     * Метод рисует игровое поле и игрока на нём
     */
    renderBoard() {
        let result = this.generateBoard();
        document.body.insertAdjacentHTML('afterbegin', result);
        this.renderUserPosition(player);
    },

    /**
     * Метод генерирует игровое поле по размерам в конфиге
     * @returns {string} html-код таблицы игрового поля
     */
    generateBoard() {
        let board = '';
        for (let y = 0; y < config.rowsCount; y++) {
            board += '<tr>';
            for (let x = 0; x < config.colsCount; x++) {
                board += `<td data-x="${x}" data-y="${y}"></td>`;
            }
            board += '</tr>';
        }
        return `<table><tbody>${board}</tbody><table>`;

    },

    /**
     * Возвращает объект ячейки с переданными координатами или null, если такой нет.
     * @param {{x: number, y: number}} position  объект с координатами
     * @returns {HTMLTableCellElement|null} объект ячейки, если есть, или null.
     */
    getSquare(position) {
        return document.querySelector(`[data-x="${position.x}"][data-y="${position.y}"]`);
    },

    /**
     * Метод рисует расположение пользователя для указанной координаты,
     * добавляя класс .user тегу td.
     * @param {{x: number, y: number}} position 
     */
    renderUserPosition(position) {
        let square = this.getSquare(position);
        square.classList.add('user');
    },

    /**
     * Метод удаляет пользователя с игрового поля. У тега td удаляет класс "user".
     */
    clearUserPosition() {
        document.querySelector('.user').classList.remove('user');
    }
        
        
};
