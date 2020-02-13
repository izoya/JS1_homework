let renderer = {

    // Сюда запишем всё, что надо отобразить.
    map: "",

    /**
     * Отображает игру в консоли.
     */
    render() {
        for (let row = 0; row < config.rowsCount; row++) {
            for (let col = 0; col < config.colsCount; col++) {
                if (player.y === row && player.x === col) {
                    this.map += 'O ';
                }
                else {
                    this.map += 'x ';
                }


            }
            this.map += '\n';

        }
        console.log(this.map);

    },

    clear() {
        // Чистим консоль.
        console.clear();
        // Чистим карту.
        this.map = "";
    }




};