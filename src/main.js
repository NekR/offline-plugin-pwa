require('./style.css');

(function() {
  var rotation = 0;
  var hexagon = document.querySelector('#hexagon');

  setInterval(function() {
    if (rotation === 300) {
      rotation = -60;
      hexagon.removeAttribute('data-animation');
      hexagon.style.transform = 'rotate(' + rotation + 'deg)';
    }

    rotation = rotation + 60;

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        hexagon.setAttribute('data-animation', '');
        hexagon.style.transform = 'rotate(' + rotation + 'deg)';
      })
    });
  }, 3000);
}());