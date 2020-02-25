/** Здесь хранится статус игры: играем, пауза, завершено. */

class Status {
    constructor() {
        this.setPaused();
        this.count = 1;
        this.countEl = document.querySelector('#count b');
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

    increaseCount() {
        return this.count++;
    }

    setCount() {
        this.countEl.innerText = this.count;
    }
}