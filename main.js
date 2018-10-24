'use strict';
var result;
var image = [];
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
var previousUserLikes = {
  'Star Wars Bag': 0,
  'Banana Cutter': 0,
  'Toilet Tablet': 0,
  'Collection Boots': 0,
  'Breakfast Toaster': 0,
  'Meaty Gum': 0,
  'Invert Seat': 0,
  'Horror Action Figure': 0,
  'Bill Muzzle': 0,
  'Monsterous Meatlof': 0,
  'Office Utensils': 0,
  'Sniffer Swiffer': 0,
  'Pizza Slicer': 0,
  'Sleepy Jaws': 0,
  'Under Broom': 0,
  'Emergency Steed': 0,
  'Magical Meat': 0,
  'Kraken USB Stick': 0,
  'Everfilling Watering Can': 0,
  'Gravity Defying Glass': 0,
};

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
  if (localStorage.getItem('allUserData')){
    allUsers = JSON.parse(localStorage.getItem('allUserData'));
  };
  var getter = JSON.parse(localStorage.getItem('userData'));
  allUsers.push(getter);
  localStorage.setItem('allUserData', JSON.stringify(allUsers));
};

function dataLog(){
  var nameArr = [];
  for (var i in allUsers) {
    for (var j in allUsers[i]) {
      previousUserLikes[allUsers[i][j].name] += allUsers[i][j].likes;
    }
  }


  var result = Object.keys(previousUserLikes).reduce((acc, curr, i)=>{
    var image = {};
    image[name] = curr;
    image[curr] = previousUserLikes[curr];
    return [...acc, image];
  }, []);

  console.log('RESULT', result);
  return result;
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
    localStorage.setItem('userData', JSON.stringify(allImages));
    
    if (clickCount === 25 && localStorage.getItem('userData')){
      dataEntry();
    };
    
    
    if (clickCount === 25 || clickCount > 25) {
      imageSelection.removeEventListener('click', chooseNewImage);
      renderChart();
      renderChart2();
      // dataLog();
    }
  }
};

imageSelection.addEventListener('click', chooseNewImage);
dynamicColors();


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Charts
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var renderChart = function() {
  // var busMallNames = [];
  var busMallLikes = [];
  var polarChart;
  for (var i in allImages) {
    busMallLikes.push(allImages[i].likes);
  }
  var chartData = {
    labels: Object.keys(previousUserLikes),
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
        min: -1,
        max: 7,
        stepSize: 1,
      },
      pointLabels: {
        fontSize: 18,
      },
    },
    legend: {
      position: 'left',
    },
  };
  polarChart = {
    type: 'polarArea',
    data: chartData,
    options: chartOptions,
  };

  var userChart = new Chart(ctx, polarChart);
};

var renderChart2 = function() {
  var busMallLikes = [];
  var radarChart;
  for (var i in allImages) {
    busMallLikes.push(allImages[i].likes);
  }

  var labels = dataLog().reduce((acc, curr, i )=>{
    return [...acc, curr.name];
  }, []);

  var data =  dataLog().reduce((acc, curr, i )=>{
    return [...acc, curr.likes];
  }, []);

  var chartData = {
      labels: labels,
      datasets: [{
        label: 'previous-User',
        backgroundColor: backgroundColors[0],
        borderColor: borderColors[0],
        fill: false,
        radius: 5,
        pointRadius: 5,
        pointBorderWidth: 1,
        pointBackgroundColor: backgroundColors[1],
        pointBorderColor: borderColors[1],
        pointHoverRadius: 5,
        data: data,   
      }],
      labels: labels,
      datasets: [{
        label: 'current-User',
        backgroundColor: backgroundColors[2],
        borderColor: borderColors[2],
        fill: false,
        radius: 5,
        pointRadius: 5,
        pointBorderWidth: 1,
        pointBackgroundColor: backgroundColors[3],
        pointBorderColor: borderColors[3],
        pointHoverRadius: 5,
        data: busMallLikes,
      }],
    },
    radarChart = {
      type: 'radar',
      data: chartData,
    // options: chartOptions,
    },

    dataChart = new Chart(ctx2, radarChart);
};