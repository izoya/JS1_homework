/** Здесь хранится статус игры: играем, пауза, завершено. */

class Status {
    constructor() {
        this.setPaused();
    }

    setPlaying() {
        this.condition = 'playing';
    }

    setPaused() {
        this.condition = 'paused';
    }

    isPlaying() {
        return this.condition === 'playing';
    }

    isPaused() {
        return this.condition === 'paused';
    }
}