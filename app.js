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
let maxAttempts = 5;
let attempt = 1;
let bus = [];
let gNames = [];
let votes = [];
let pick  =  [];
let views = [];
function BusMall(busName) {
    this.gName = busName.split('.')[0];
    this.gImg = `img/${busName}`;
    this.votes = 0;
    this.views = 0;
    bus.push(this);
    gNames.push(this.gName);
}



for (let i = 0; i < busImages.length; i++) {
    new BusMall(busImages[i]);
}

function randomImage() {
   
    return Math.floor(Math.random() * bus.length);
    
}


let leftIndex;
let rightIndex;
let centerindex;
let imagesPerRound = [];

function renderImg() 
{
    leftIndex = randomImage();
    rightIndex =  randomImage();
    centerindex =  randomImage();
    while (leftIndex === centerindex || leftIndex === rightIndex ||
        centerindex === rightIndex || imagesPerRound.includes(leftIndex) ||
         imagesPerRound.includes(centerindex) || imagesPerRound.includes(rightIndex))
        {
            leftIndex = randomImage();
            rightIndex =  randomImage();
            centerindex =  randomImage();
          

             
            }
            imagesPerRound = [];
            imagesPerRound[0]=leftIndex;
            imagesPerRound[1]=centerindex;
            imagesPerRound[2]=rightIndex;
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
        //console.log(bus);
        attempt++;
    } else {


        let button = document.getElementById('display-button').onclick = function() {display()};

        let arrimge=[];
        function display() {

            for (let i = 0; i < bus.length; i++) {
                let liEl = document.createElement('li');
                result.appendChild(liEl);
                 liEl.textContent = `${bus[i].gName} has ${bus[i].votes} votes and  ${bus[i].views} views.`;
                 votes.push(bus[i].votes);
                views.push(bus[i].views);
                arrimge.push(bus[i].gName);
            }
            
            leftImg.removeEventListener('click', clickHandler);
            rightImg.removeEventListener('click', clickHandler);
            centerImg.removeEventListener('click', clickHandler);

        }
    }
}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type : 'bar',
        data: {
            labels: busImages,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1

            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
chartRender();