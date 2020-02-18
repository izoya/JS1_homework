'use strict';
let descriptions = [
    {
        id: '1',
        desc: 'Ку́бик Ру́бика (ошибочно — кубик-рубик; первоначально был известен как «магический кубик», венг. bűvös kocka) — механическая головоломка, изобретённая в 1974 году (и запатентованная в 1975 году) венгерским скульптором и преподавателем архитектуры Эрнё Рубиком.'
    },
    {
        id: '2',
        desc: 'В центре конструкции вместо «невидимого кубика» находится трёхмерная крестовина, на которой свободно вращаются центральные элементы. Все остальные элементы держатся друг за друга, входя выступами в вышеуказанную выемку.'
    },
    {
        id: '3',
        desc: 'В июле 2010 года программистТомас Рокики, учитель математики Герберт Коцемба, математик Морли Дэвидсон и инженер Джон Детридж доказали, что каждая конфигурация кубика Рубика может быть решена не более чем в 20 ходов.  Таким образом, число Бога в метрике FTM оказалось равно 20 ходам.'
    },
];

let buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', function () {
        let product = button.parentNode;
        if (!product.querySelector('.desc')) {
            product.querySelector('img').style.display = 'none';
            let desc = document.createElement('div');
            product.insertBefore(desc, button);
            product.querySelectorAll('div')[1].className = 'desc';
            desc.innerText = descriptions.find(item => item.id == product.id).desc;
            
            button.innerText = 'Отмена';
        }
        else {
            button.innerText = 'Подробнее';
            product.querySelector('.desc').remove();
            product.querySelector('img').style.display = 'initial';
            
        }
    });
});
console.dir(buttons);