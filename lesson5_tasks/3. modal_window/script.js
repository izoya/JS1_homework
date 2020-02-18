'use strict';

let modal = document.querySelector('.modal');
let button = document.querySelector('button');
let close = document.querySelector('.close');


button.addEventListener('click', function (event) {
    modal.classList.remove('puff-out-center');
    modal.style.opacity = 100;
    modal.classList.add('puff-in-center');
    modal.style.display = 'flex';

});

close.addEventListener('click', function () {
    modal.classList.remove('puff-in-center');
    modal.classList.add('puff-out-center');
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);
});
