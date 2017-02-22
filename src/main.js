require('./style.css');

var OfflinePlugin = require('offline-plugin/runtime');

OfflinePlugin.install({
  onInstalled: function() {
    openOfflineReady();
  },

  onUpdating: function() {

  },

  onUpdateReady: function() {
    OfflinePlugin.applyUpdate();
  },
  onUpdated: function() {
    window.location.reload();
  }
});

var hexagon = document.querySelector('#hexagon');
var offlineReady = document.querySelector('#offline-ready');
var offlineReadyClose = document.querySelector('#offline-ready-close');
var wifiShape = document.querySelector('#wifi-shape');

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

window.addEventListener('offline', function() {
  goOffline();
});

window.addEventListener('online', function() {
  requestAnimationFrame(function() {
    wifiShape.classList.remove('wifi-offline');
    requestAnimationFrame(function() {
      wifiShape.classList.add('wifi-online');
    });
  });
});

if (!navigator.onLine) {
  setTimeout(function() {
    goOffline();
  }, 300);
}

function goOffline() {
  requestAnimationFrame(function() {
    wifiShape.classList.remove('wifi-online');
    requestAnimationFrame(function() {
      wifiShape.classList.add('wifi-offline');
    });
  });
}

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