'use strict';

var ImageLeft = document.getElementById('left');
var ImageCenter = document.getElementById('center');
var ImageRight = document.getElementById('right');
var imageSelection = document.getElementById('click-here');
var ctx = document.getElementById('likesChart').getContext('2d');

var allImages = [];
var borderColors = [];
var backgroundColors = [];
var currentLeftImageIndex = 0;
var currentCenterImageIndex = 12;
var currentRightImageIndex = 19;
var clickCount = 0;

var ImageIndex = function(src, name){
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  this.name = name;
  allImages.push(this);
};

ImageIndex.prototype.renderImage = function(){
  ImageIndex.src = this.src;
};


var dynamicBorderColors = function(){
  for (var i = 0; i < 20; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    borderColors.push(`rgb(${r},${g},${b})`);
  };
};
var dynamicBackgroundColors = function(){
  for (var i = 0; i < 20; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    backgroundColors.push(`rgb(${r},${g},${b})`);
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

    clickCount++;
    if (clickCount === 25 || clickCount > 25) {
      imageSelection.removeEventListener('click', chooseNewImage);
      renderChart();
    }
  }
};

imageSelection.addEventListener('click', chooseNewImage);

dynamicBackgroundColors();
dynamicBorderColors();

new ImageIndex('./img/bag.jpg', 'Star Wars Bag');
new ImageIndex('./img/banana.jpg', 'Banana Cutter');
new ImageIndex('./img/bathroom.jpg', 'Toilet Tablet');
new ImageIndex('./img/boots.jpg', 'Collection Boots');
new ImageIndex('./img/breakfast.jpg', 'Breakfast Toaster');
new ImageIndex('./img/bubblegum.jpg', 'Meaty Gum');
new ImageIndex('./img/chair.jpg', 'Invert Seat');
new ImageIndex('./img/cthulhu.jpg', 'Horror Action Figure');
new ImageIndex('./img/dog-duck.jpg', 'Bill Muzzle');
new ImageIndex('./img/dragon.jpg', 'Monsterous Meatlof');
new ImageIndex('./img/pen.jpg', 'Office Utensils');
new ImageIndex('./img/pet-sweep.jpg', 'Swiffer Sniffer');
new ImageIndex('./img/scissors.jpg', 'Pizza Slicer');
new ImageIndex('./img/shark.jpg', 'Sleepy Jaws');
new ImageIndex('./img/sweep.png', 'Under Broom');
new ImageIndex('./img/tauntaun.jpg', 'Emergency Steed');
new ImageIndex('./img/unicorn.jpg', 'Magical Meat');
new ImageIndex('./img/usb.gif', 'Kraken USB Stick');
new ImageIndex('./img/water-can.jpg', 'Everfilling Watering Can');
new ImageIndex('./img/wine-glass.jpg', 'Gravity Defying Glass');
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
      backgroundColor: [backgroundColors],
      borderColor: [borderColors],
      borderWidth: 1,
    }],
  };
  var chartOptions = {
    startAngle: -Math.random / 4,
    legend: {
      position: 'left',
    },
    animation: {
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