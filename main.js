'use strict';

var allImages = [];
var borderColors = [];
var backgroundColors = [];
var clickCount = 0;
var currentLeftImageIndex = 3;
var currentCenterImageIndex = 12;
var currentRightImageIndex = 19;
var ImageLeft = document.getElementById('left');
var ImageCenter = document.getElementById('center');
var ImageRight = document.getElementById('right');
var ImgLeftText = document.getElementById('img-left-text');
var ImgCenterText = document.getElementById('img-center-text');
var ImgRightText = document.getElementById('img-right-text');
var imageSelection = document.getElementById('click-here');
var ctx = document.getElementById('likesChart').getContext('2d');

var imageIndex = function(src, name){
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  this.name = name;
  allImages.push(this);
};

var dynamicColors = function(){
  for (var i = 0; i < 20; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    backgroundColors.push(`rgb(${r},${g},${b},5.0)`);
  };
  for (var i = 0; i < 20; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    borderColors.push(`rgb(${r},${g},${b},5.0)`);
  };
};

var chooseNewImage = function (event) {

  if(event.target.id === 'left' || event.target.id === 'center' || event.target.id === 'right'){

    do {
      var randomNumberLeft = Math.floor(Math.random() * allImages.length);
    } while (randomNumberLeft === currentLeftImageIndex ||
      randomNumberLeft === currentCenterImageIndex ||
      randomNumberLeft === currentRightImageIndex);

    do {
      var randomNumberCenter = Math.floor(Math.random() * allImages.length);
    } while (randomNumberCenter === randomNumberLeft ||
      randomNumberCenter === currentLeftImageIndex ||
      randomNumberCenter === currentCenterImageIndex ||
      randomNumberCenter === currentRightImageIndex);

    do {
      var randomNumberRight = Math.floor(Math.random() * allImages.length);
    } while (randomNumberRight === randomNumberLeft ||
      randomNumberRight === currentLeftImageIndex ||
      randomNumberRight === randomNumberCenter ||
      randomNumberRight === currentCenterImageIndex ||
      randomNumberRight === currentRightImageIndex);

    if(event.target.id === 'left'){
      allImages[currentLeftImageIndex].likes++;
    } else if (event.target.id === 'center') {
      allImages[currentCenterImageIndex].likes++;
    } else {
      allImages[currentRightImageIndex].likes++;
    }

    allImages[currentLeftImageIndex].appeared++;
    allImages[currentCenterImageIndex].appeared++;
    allImages[currentRightImageIndex].appeared++;

    currentLeftImageIndex = randomNumberLeft;
    currentCenterImageIndex = randomNumberCenter;
    currentRightImageIndex = randomNumberRight;

    ImageLeft.src = allImages[randomNumberLeft].src;
    ImageCenter.src = allImages[randomNumberCenter].src;
    ImageRight.src = allImages[randomNumberRight].src;
    ImgLeftText.textContent = allImages[randomNumberLeft].name;
    ImgCenterText.textContent = allImages[randomNumberCenter].name;
    ImgRightText.textContent = allImages[randomNumberRight].name;

    clickCount++;
    if (clickCount === 25 || clickCount > 25) {
      imageSelection.removeEventListener('click', chooseNewImage);
      renderChart();
    }
  }
};

imageSelection.addEventListener('click', chooseNewImage);

dynamicColors();

new imageIndex('./img/bag.jpg', 'Star Wars Bag');
new imageIndex('./img/banana.jpg', 'Banana Cutter');
new imageIndex('./img/bathroom.jpg', 'Toilet Tablet');
new imageIndex('./img/boots.jpg', 'Collection Boots');
new imageIndex('./img/breakfast.jpg', 'Breakfast Toaster');
new imageIndex('./img/bubblegum.jpg', 'Meaty Gum');
new imageIndex('./img/chair.jpg', 'Invert Seat');
new imageIndex('./img/cthulhu.jpg', 'Horror Action Figure');
new imageIndex('./img/dog-duck.jpg', 'Bill Muzzle');
new imageIndex('./img/dragon.jpg', 'Monsterous Meatlof');
new imageIndex('./img/pen.jpg', 'Office Utensils');
new imageIndex('./img/pet-sweep.jpg', 'Sniffer Swiffer');
new imageIndex('./img/scissors.jpg', 'Pizza Slicer');
new imageIndex('./img/shark.jpg', 'Sleepy Jaws');
new imageIndex('./img/sweep.png', 'Under Broom');
new imageIndex('./img/tauntaun.jpg', 'Emergency Steed');
new imageIndex('./img/unicorn.jpg', 'Magical Meat');
new imageIndex('./img/usb.gif', 'Kraken USB Stick');
new imageIndex('./img/water-can.jpg', 'Everfilling Watering Can');
new imageIndex('./img/wine-glass.jpg', 'Gravity Defying Glass');
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Charts
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var renderChart = function() {
  var busMallNames = [];
  var busMallLikes = [];
  for (var i in allImages) {
    busMallNames.push(allImages[i].name);
    busMallLikes.push(allImages[i].likes);
  }
  var chartData = {
    labels: busMallNames,
    datasets: [{
      label: '# of Votes',
      data: busMallLikes,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 2,
    }],
  };
  var chartOptions = {
    startAngle: 15,
    legend: {
      position: 'left',
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };
  var polarChart = {
    type: 'polarArea',
    data: chartData,
    options: chartOptions,
  };
  var myChart = new Chart(ctx, polarChart);

};