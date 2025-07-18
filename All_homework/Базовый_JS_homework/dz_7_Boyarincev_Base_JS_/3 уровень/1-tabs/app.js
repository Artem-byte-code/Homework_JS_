'use strict';
const texts = {
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    text2: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
    text3: 'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил.'
};

const textElement = document.querySelector('.text'); // Блок, куда будем вставлять текст
const navLinks = document.querySelectorAll('.nav-link'); // Все ссылки 

navLinks.forEach(link => {
    link.addEventListener('click', clickHandler); // добавляем обработчик на каждую ссылку
});

function clickHandler(event) {
    changeActiveClass(event); // Переключаем активный класс
    changeText(event);       // Меняем текст
}

function changeActiveClass(event) {
    //Находим текущий активный элемент
    const currentActive = document.querySelector('.nav-link.active');
    
    //Убираем у него класс active
    if (currentActive) {
        currentActive.classList.remove('active');
    }
    
    //Добавляем класс active к элементу, по которому кликнули
    event.target.classList.add('active');
}

function changeText(event) {
    // Получаем текст ссылки
    const linkText = event.target.textContent;
    
    // Выбираем нужный текст из объекта texts
    let selectedText;
    if (linkText === 'Link 1') {
        selectedText = texts.text1;
    } else if (linkText === 'Link 2') {
        selectedText = texts.text2;
    } else if (linkText === 'Link 3') {
        selectedText = texts.text3;
    }
    
    // Вставляем текст в элемент
    textElement.textContent = selectedText;
}
