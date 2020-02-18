'use strict';

let section = document.querySelector('section');
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

for (let i = 9; i >= 0; i--) {
    for (let j = -1; j < 9; j++) {
        let cell = section.appendChild(document.createElement('div'));
        let cellObject = getCellTextAndParams(i, j);
     
        cell.innerText = cellObject.text;
        cell.className = cellObject.class;
        if (cellObject.id) {
            cell.id = cellObject.id;
        }
    };
};

function getCellTextAndParams(i, j) {
    let cellObject = {
        text: '',
        class: 'legend',
    }
    // пустые клетки
    if ((i == 9 || i == 0) &&
        (j == -1 || j == 8)) {
        return cellObject;
    };
    if (i == 9 || i == 0) {
        cellObject.text = letters[j];
        return cellObject;
    };
    if (j == -1 || j == 8) {
        cellObject.text = i;
        return cellObject;
    }
    else {
        if (Math.abs((j - i)) % 2 == 1) {
            cellObject.class = 'black';
        }
        else {
            cellObject.class = 'white';
        }
        cellObject.id = letters[j] + i;
        return cellObject;
    }

}