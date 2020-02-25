class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.body = [
            {
                x: 1,
                y: 1
            }
        ];
        this.direction = 'down';
    }

    init(settings) {
        this.settings = settings;
    }

    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано неверное направление (' + newDirection + ').');
        }
        if (this.isPassedOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    performStep() {
        let currentHeadCoords = this.body[0];
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y
        };
        switch (this.direction) {
            case "down":
                newHeadCoords.y++;
                break;
            case "up":
                newHeadCoords.y--;
                break;
            case "left":
                newHeadCoords.x--;
                break;
            case "right":
                newHeadCoords.x++;
                break;
        }
        if (newHeadCoords.x < 1) newHeadCoords.x = this.settings.colsCount;
        if (newHeadCoords.y < 1) newHeadCoords.y = this.settings.rowsCount;
        if (newHeadCoords.x > this.settings.colsCount) newHeadCoords.x = 1;
        if (newHeadCoords.y > this.settings.rowsCount) newHeadCoords.y = 1;

        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    increaseBody() {
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {
            x: bodyLastCell.x,
            y: bodyLastCell.y
        };
        /** TODO А почему сразу bodyLastCell не вставить в массив? */
        this.body.push(newBodyLastCell);
    }
}