

document.addEventListener('DOMContentLoaded', function () {

  var mapEl = document.getElementById('contactMap');
  if (!mapEl) {
    return; 
  }

  var frame = mapEl.closest('.map-frame');


  var lat = parseFloat(mapEl.dataset.lat) || 53.757371;
  var lng = parseFloat(mapEl.dataset.lng) || 10.13221;
  var zoom = parseInt(mapEl.dataset.zoom, 10) || 15;
  var popupHtml = mapEl.dataset.popup ||
    '<strong>LBC Happy Place Alpaka gUG</strong><br>Schulstrasse 10, 23863 Kayhude';


  var viewUrl = 'https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lng +
    '#map=' + zoom + '/' + lat + '/' + lng;
  var routeUrl = 'https://www.openstreetmap.org/directions?to=' + lat + '%2C' + lng;

  document.querySelectorAll('.js-map-view-link').forEach(function (a) {
    a.href = viewUrl;
  });
  document.querySelectorAll('.js-map-route-link').forEach(function (a) {
    a.href = routeUrl;
  });


  if (typeof L === 'undefined') {
    if (frame) {
      frame.classList.add('map-failed');
    }
    return;
  }


  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  });

  var map = L.map(mapEl, {
    center: [lat, lng],
    zoom: zoom,
    scrollWheelZoom: false 
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup(popupHtml);


  function activate() {
    map.scrollWheelZoom.enable();
    if (frame) {
      frame.classList.add('is-active');
    }
  }
  map.once('click', activate);
  map.once('focus', activate);


  window.addEventListener('resize', function () {
    map.invalidateSize();
  });
  setTimeout(function () { map.invalidateSize(); }, 300);

});
