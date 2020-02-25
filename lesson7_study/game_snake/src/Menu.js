class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }


}

