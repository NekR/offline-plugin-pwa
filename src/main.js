require('./style.css');

var hexagon = document.querySelector('#hexagon');
var offlineReady = document.querySelector('#offline-ready');
var offlineReadyClose = document.querySelector('#offline-ready-close');

(function() {
  var rotation = 0;

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

offlineReadyClose.addEventListener('click', function() {
  closeOfflineReady()
});

function openOfflineReady() {
  requestAnimationFrame(function() {
    offlineReady.setAttribute('data-open', '');
  });

  setTimeout(closeOfflineReady, 30 * 1000);
}

function closeOfflineReady() {
  requestAnimationFrame(function() {
    offlineReady.removeAttribute('data-open');
  });
}