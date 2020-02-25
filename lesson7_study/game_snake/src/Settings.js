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