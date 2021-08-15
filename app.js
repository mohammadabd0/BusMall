'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let rightImg = document.getElementById('rightImg');
let centerImg = document.getElementById('centerImg');

let result = document.getElementById('results');
let busImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg',
    'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg',
    'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let bus = [];

function BusMall(busName) {
    this.gName = busName.split('.')[0];
    this.gImg = `img/${busName}`;
    this.votes = 0;
    this.views = 0;
    bus.push(this);
}



for (let i = 0; i < busImages.length; i++) {
    new BusMall(busImages[i]);
}

console.log(bus);
function randomImage() {
    return Math.floor(Math.random() * bus.length);

}

let leftIndex;
let rightIndex;
let centerindex;
function renderImg() {
    leftIndex = randomImage();
    rightIndex = randomImage();
    centerindex = randomImage();

    while (leftIndex === rightIndex || leftIndex === centerindex) {
        leftIndex = randomImage();
    }
    while (rightIndex === leftIndex || rightIndex === centerindex) {
        rand2 = randomImage();
    }
    while (centerindex === leftIndex || centerindex === rightIndex) {
        rand3 = randomImage();
    }
    leftImg.setAttribute('src', bus[leftIndex].gImg);
    rightImg.setAttribute('src', bus[rightIndex].gImg);
    centerImg.setAttribute('src', bus[centerindex].gImg);
    bus[leftIndex].views++;
    bus[rightIndex].views++;
    bus[centerindex].views++;

}
renderImg();



leftImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);
centerImg.addEventListener('click', clickHandler);


function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            bus[leftIndex].votes++;
        } else if (clickedImage === 'rightImg') {
            bus[rightIndex].votes++
        } else if (clickedImage === 'centerImg') {
            bus[centerindex].votes++
        }
        renderImg();
        console.log(bus);
        attempt++;
    } else {


        let button = document.getElementById('display-button');
        button.addEventListener("click", display);

        function display() {

            for (let i = 0; i < bus.length; i++) {
                let liEl = document.createElement('li');
                result.appendChild(liEl);
                liEl.textContent = `${bus[i].gName} has ${bus[i].votes} votes and  ${bus[i].views} views.`;
            }
            leftImg.removeEventListener('click', clickHandler);
            rightImg.removeEventListener('click', clickHandler);
            centerImg.removeEventListener('click', clickHandler);

        }
    }
}
