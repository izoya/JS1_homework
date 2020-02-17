renderer.renderBoard();
//событие по нажатию на клавишу
window.addEventListener('keydown', function (event) {
    mover.makeStep(event);
});
