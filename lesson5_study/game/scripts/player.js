let player = {
    x: 0,
    y: 0,

    /**
     * Метод задаёт пользователю новое положение
     * @param {{x: int, y: int}} nextPoint 
     */
    changePosition(nextPoint) {
        this.x = nextPoint.x;
        this.y = nextPoint.y;
    }
};
