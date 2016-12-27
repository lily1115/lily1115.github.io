var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

canvas.width = canvasWidth
canvas.height = canvasHeight

var image = new Image()
var radius = 50
var clippingRegion = {x: 0 ,y: 0, r: radius}
var leftMargin = 0, topMargin = 0

image.src = 'img5.jpg'
image.onload = function  (e) {
  // var blurDiv = document.getElementById('blur-div')
  // var blurImage = document.getElementById('blur-image')
  $('#blur-div').css('width', canvasWidth + 'px')
  $('#blur-div').css('height', canvasHeight + 'px')
  $('#blur-image').css('width', image.width + 'px')
  $('#blur-image').css('height', image.height + 'px')

  leftMargin = (image.width - canvas.width)/2
  topMargin = (image.height - canvas.height)/2

  $('#blur-image').css('top', '-'+ topMargin + 'px')
  $('#blur-image').css('left', '-'+ leftMargin + 'px')

  initCanvas()
}

function initCanvas () {
  theleft = leftMargin < 0 ? -leftMargin : 0
  thetop = topMargin < 0 ? -topMargin : 0
  clippingRegion = {
    x: Math.random()*(canvas.width - 2*radius -2*theleft)+ radius + theleft, 
    y: Math.random()*(canvas.height - 2*radius -2*thetop)+ radius + theleft, 
    r: radius}
  draw(image, clippingRegion)
}

function setClippingRegion (clippingRegion) {
  context.beginPath()
  context.arc( clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false )
  context.clip()

}

function draw (image , clippingRegion) {
  context.clearRect(0, 0 , canvas.width, canvas.height)

  context.save()
  setClippingRegion(clippingRegion)
  // context.drawImage(image, 0, 0)
  context.drawImage(image,
    leftMargin, topMargin, canvas.width, canvas.height,
         0, 0, canvas.width, canvas.height )
  context.restore()
}

function reset () {
  // clearInterval(t);
  initCanvas()
}

function show () {
  var t = setInterval(function () {
    clippingRegion.r += 20
    // console.log(clippingRegion.r);
    if (clippingRegion.r > 2*Math.max(canvas.width, canvas.height)) {
      clearInterval(t);
    };
    draw(image, clippingRegion)
  }, 30);
}