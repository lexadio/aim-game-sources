const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen'); // тут получаем массив
const timeList = document.querySelector('#time_list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [['#16D9E3', '#30C7EC', '#46AEF7'], ['#eb1429', '#e2b31d', '#cda332'], ['#4ccb34', '#34cb68', '#97cb34']];
let activeColors = ['#16D9E3', '#30C7EC', '#46AEF7'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault(); // тк это ссылка, мы получаем объект и нужно убрать появление # сбросив настройки
    screens[0].classList.add('up'); // добавляем класс первому элементу в массиве
})

timeList.addEventListener('click', event => {
    // console.log(event.target);
    if (event.target.classList.contains('time-btn')) {
     //эвент таргет - тот элемент, ко которому кликнули. Контейнс проверяет, есть ли у этого элемента класс в () 
     // нужно для того, чтобы обрабатывались только клики по кнопкам, а не в остальные места блока
    time = parseInt(event.target.getAttribute('data-time')); //полуаем значение из атрибута и приводим его к числовому
    screens[1].classList.add('up'); 
    startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    // timeEl.innerHTML = `00:${time}`; // Убираем и заменяем на функцию, тк вызовы одинаковые
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let corrent = --time;

        if (corrent < 10) {
            corrent = `0${corrent}`;
        }
        // timeEl.innerHTML = `00:${corrent}`; // Убираем и заменяем на функцию, тк вызовы одинаковые
        setTime(corrent);
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove(); // Удаляем родителя таймера (надпись Осталось)
    board.innerHTML = `<h1>Ваш Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect() // метод выводит свойства объекта и нас интересует ширина и высота. Метод деструктуризация
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle'); 
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    setColor(circle);
    console.log(circle.style);
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    let index = Math.floor((Math.random() * colors.length));
    activeColors = colors[index];
    // console.log(activeColors);
    return activeColors;
    // return colors[index];

}

function setColor(element) {
    let color = getRandomColor();
    element.style.background = `linear-gradient(90deg, ${color[0]} 0%, ${color[1]} 47%, ${color[2]} 100%)`
}

