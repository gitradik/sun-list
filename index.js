const spinner = document.getElementsByClassName('spinner')[0];
const circle = document.getElementsByClassName('circle')[0];
const list = document.querySelector('.spinner .list');

function shuffleArray(array = [
    "#ffcb43", "#ffca42", "#ffc941", "#ffc740", "#ffc63f", 
    "#ffc53e", "#ffc33d", "#ffc13b", "#ffc03a", "#ffbe38", 
    "#ffbc36", "#ffba34", "#ffb932", "#ffb72f", "#ffb52d", 
    "#ffb22a", "#ffb027", "#ffae24", "#ffab21", "#ffa81e", 
    "#ffa51a", "#ffa317", "#ffa014", "#ff9d11",
]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // меняем местами элементы
    }
    return array;
}

const colors = shuffleArray();

const listItems = [
    'Mercury <span>(0.39 АЕ)</span>',  // Меркурий
    'Venus <span>(0.72 АЕ)</span>',    // Венера
    'Earth <span>(1 АЕ)</span>',       // Земля
    'Mars <span>(1.52 АЕ)</span>',     // Марс
    'Jupiter <span>(5.2 АЕ)</span>',   // Юпитер
    'Saturn <span>(9.58 АЕ)</span>',   // Сатурн
    'Uranus <span>(19.22 АЕ)</span>',  // Уран
    'Neptune <span>(30.05 АЕ)</span>', // Нептун
    'Pluto <span>(39.48 АЕ)</span>',   // Плутон
    'Haumea <span>(~43.13 АЕ)</span>', // Хаумеа
    'Makemake <span>(~45.79 АЕ)</span>', // Макемаке
    'Eris <span>(~68 АЕ)</span>'      // Эрида
];
const bgListItems = [
    `mercurii.jpg`,
    `venus.jpg`,
    `earth.jpg`,
    `mars.jpg`,
    `jupiter.jpg`,
    `saturn.jpg`,
    `uranus.jpg`,
    `neptune.jpg`,
    `pluto.jpg`,
    `haumea.jpg`,
    `makemake.jpg`,
    `eris.jpg`,
].map(el => `assets/images/${el}`);

const rotateZ = `rotateZ(45deg)`;
let totalRotationX = 0; // общий угол поворота по оси X
let prevCentralItem = null; // Предыдущий центральный элемент

circle.style.transform = rotateZ;
// Расставляем элементы по кругу
for (let i = 0, rotation = 9; i < colors.length; i++, rotation += 9) {
    const lineElement = document.createElement('span');
    lineElement.classList.add('line');
    lineElement.style.transform = `rotateY(${rotation}deg)`;
    lineElement.style.backgroundImage = 
    `linear-gradient(to top, ${colors[i]}, #ffe204, #ffe80b, #ffef11, #fef618, #fef919, #fdfc1b, #fdff1c, #fdff18, #fdff13, #feff0e, #feff06)`;
    circle.appendChild(lineElement);
}

// После добавления всех цветовых элементов добавьте два пустых элемента
for(let i = 0; i < 2; i++) {
    const emptyElementTop = document.createElement('li');
    emptyElementTop.classList.add('list-item');
    list.appendChild(emptyElementTop);
}

for (let i = 0; i < listItems.length; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const itemContainer = document.createElement('div');
    const scaleContainer = document.createElement('div');
    scaleContainer.classList.add('scale-container');
    itemContainer.classList.add('item-container');
    itemContainer.innerHTML = `${i + 1}. ${listItems[i]}`;

    if (bgListItems[i]) {
        itemContainer.style.backgroundImage = `url(${bgListItems[i]})`;
    }

    listItem.addEventListener('click', function() {
        let result = confirm(`Are you sure about ${listItems[i]}?`);
        if (result) {
            // User clicked 'OK'
        } else {
            // User clicked 'Cancel'
        }
    });

    scaleContainer.appendChild(itemContainer)
    listItem.appendChild(scaleContainer);
    list.appendChild(listItem);
}

list.addEventListener('scroll', function() {
    const maxScrollTop = list.scrollHeight - list.clientHeight;
    const scrollPercentage = list.scrollTop / maxScrollTop;
    const maxRotation = 24 * 24;
    totalRotationX = scrollPercentage * maxRotation;
    circle.style.transform = `${rotateZ} rotateY(${totalRotationX}deg)`;
});