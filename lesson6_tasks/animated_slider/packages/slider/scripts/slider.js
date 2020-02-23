'use strict';

let slider = document.querySelector('.slider');
// список стилей анимации слайдов
let animation = ['goToRight', 'goToLeft', 'goFromRight', 'goFromLeft'];

// Создаём иконку загрузки
let loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

// Создаём левую стрелку
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

// Создаём правую стрелку
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

// Ждем, когда весь контент целиком загрузится
window.addEventListener('load', function () {
    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();

    });
    //Инициализация слайдера
    images.init();
    loadIcon.style.display = 'none';
});

/**
 * Функция берёт у эл-та слайдера его дата-атрибуты размеров,
 * и, если они определены, то устанавливает их для слайдера.
 * @param {HTMLDivElement} slider
 */
function setSizes(slider) {
    let width = slider.getAttribute("data-width");
    let height = slider.getAttribute("data-height");

    if (width !== null && width !== "") {
        slider.style.width = width;
    }
    if (height !== null && height !== "") {
        slider.style.height = height;
    }
}

setSizes(slider);

// Объект слайдера
let images = {
    /* {int} Номер текущего изображения */
    currentIdx: 0,

    prevIdx: null,

    /* {HTMLDivElement[]} элементы слайдов*/
    slides: [],

    /** Получаем все слайды и показываем первый слайд */
    init() {
        this.slides = document.querySelectorAll('.slide');
        this.slides[this.currentIdx].classList.remove('slide_left');
    },

    /** TODO Убрать эту ф-цию
     * Берем  слайд с текущим индексом и убираем у него класс slide_hidden */
    showImageWithCurrentIdx() {
        if (this.slides[this.currentIdx].classList.contains('slide_right')) {
            this.slides[this.currentIdx].classList.remove('slide_right');
        }
        if (this.slides[this.currentIdx].classList.contains('slide_left')) {
            this.slides[this.currentIdx].classList.remove('slide_left');
            //this.slides[this.prevIdx].classList.add('slide_right');
        }
    },

    /** Всем слайдам обнулить анимацию */
    deleteAnimation() {
        this.slides.forEach(function (slide) {
            animation.forEach(function (style)  {
                if (slide.classList.contains(style)) {
                    slide.classList.remove(style);
                };
            });
        });
    },

    /** Переключиться на предыдущее изображение */
    setNextLeftImage() {
        /** Убираем предыдущую анимацию         * */
        this.deleteAnimation();

        this.prevIdx = this.currentIdx;

        if (this.currentIdx === 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        images.slides[this.currentIdx].classList.add('goFromLeft');
        images.slides[this.currentIdx].classList.remove('slide_left', 'slide_right');
        images.slides[this.prevIdx].classList.add('goToRight', 'slide_right');
    },

    /** Переключиться на следующее изображение */
    setNextRightImage() {
        /** Убираем предыдущую анимацию         * */
        this.deleteAnimation();

        this.prevIdx = this.currentIdx;

        if (this.currentIdx === this.slides.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        images.slides[this.currentIdx].classList.add('goFromRight');
        images.slides[this.currentIdx].classList.remove('slide_left', 'slide_right');
        images.slides[this.prevIdx].classList.add('goToLeft', 'slide_left');
    },

};
