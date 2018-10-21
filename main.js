'use strict';

var allUsers = [];
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
var ctx = document.getElementById('currentLikesChart').getContext('2d');
var ctx2 = document.getElementById('previousLikesChart').getContext('2d');

var ImageIndex = function(src, name){
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  this.name = name;
  allImages.push(this);
};

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
new ImageIndex('./img/pet-sweep.jpg', 'Sniffer Swiffer');
new ImageIndex('./img/scissors.jpg', 'Pizza Slicer');
new ImageIndex('./img/shark.jpg', 'Sleepy Jaws');
new ImageIndex('./img/sweep.png', 'Under Broom');
new ImageIndex('./img/tauntaun.jpg', 'Emergency Steed');
new ImageIndex('./img/unicorn.jpg', 'Magical Meat');
new ImageIndex('./img/usb.gif', 'Kraken USB Stick');
new ImageIndex('./img/water-can.jpg', 'Everfilling Watering Can');
new ImageIndex('./img/wine-glass.jpg', 'Gravity Defying Glass');

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Functions
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

var dataEntry = function(){
  var getter = localStorage.getItem('userData');
  allUsers.push(getter);
  localStorage.setItem('allUserData', JSON.stringify(allUsers));
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

    if (clickCount === 25 && localStorage.getItem('userData')){
      dataEntry();
    };
    localStorage.setItem('userData', JSON.stringify(allImages.likes));

    if (clickCount === 25 || clickCount > 25) {
      imageSelection.removeEventListener('click', chooseNewImage);
      renderChart();
      renderChart2();
    }
  }
};

imageSelection.addEventListener('click', chooseNewImage);
dynamicColors();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Charts
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var renderChart = function() {
  var busMallNames = [];
  var busMallLikes = [];
  var polarChart;
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
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100,
        stepSize: 20
      },
      pointLabels: {
        fontSize: 18
      }
    },
      legend: {
        position: 'left'
      }
    };
  polarChart = {
    type: 'polarArea',
    data: chartData,
    options: chartOptions,
  };

  var userChart = new Chart(ctx, polarChart);
};

var renderChart2 = function() {
  var busMallNames = [];
  var busMallLikes = [];
  var radarChart;
  for (var i in allImages) {
    busMallNames.push(allImages[i].name);
    busMallLikes.push(allImages[i].likes);
  }
  var chartData = {
    labels: busMallNames,
    datasets: [{
      label: 'previous-User',
      backgroundColor: backgroundColors[0],
      borderColor: borderColors[0],
      fill: false,
      radius: 10,
      pointRadius: 20,
      pointBorderWidth: 3,
      pointBackgroundColor: backgroundColors[1],
      pointBorderColor: borderColors[1],
      pointHoverRadius: 10,
      data: allUsers,
      
  }],
    labels: busMallNames,
    datasets: [{
      label: 'current-User',
      backgroundColor: backgroundColors[2],
      borderColor: borderColors[2],
      fill: false,
      radius: 10,
      pointRadius: 20,
      pointBorderWidth: 3,
      pointBackgroundColor: backgroundColors[3],
      pointBorderColor: borderColors[3],
      pointHoverRadius: 10,
      data: busMallLikes,
    }]
  },
  radarChart = {
    type: 'radar',
    data: chartData,
    // options: chartOptions,
  },

  dataChart = new Chart(ctx2, radarChart)
};