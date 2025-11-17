    const SCHOOL = [60.224780, 24.758060];

    const map = L.map('map', { zoomControl: true, attributionControl: true }).setView([60.224780, 24.75], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

    const schoolMarker = L.circleMarker(SCHOOL, {
      radius: 8,
      color: '#ffffff',
      weight: 2,
      fillColor: '#000000',
      fillOpacity: 1,
      opacity: 1
    }).addTo(map).bindPopup('Karaportti 2');

    let routingControl = null;

    const tripInfoEl = document.getElementById('tripInfo');
    const legendEl = document.getElementById('legend');

    function showInfo(text, muted=false){
      tripInfoEl.innerHTML = text;
      tripInfoEl.style.color = muted ? 'var(--muted)' : 'var(--accent)';
    }

    function msToTime(ms){
      const totalMin = Math.round(ms / 60000);
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      return h>0 ? `${h} h ${m} min` : `${m} min`;
    }

    async function geocodeAddress(address){
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' }});
      if(!res.ok) throw new Error('Geocoding error');
      const data = await res.json();
      return data;
    }

    function createRoute(fromLatLng, toLatLng){
      if (routingControl) {
        try { map.removeControl(routingControl); } catch(e){}
        routingControl = null;
      }

      routingControl = L.Routing.control({
        waypoints: [L.latLng(fromLatLng[0], fromLatLng[1]), L.latLng(toLatLng[0], toLatLng[1])],
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        lineOptions: {
          styles: [
            { color: '#ffffff', opacity: 1, weight: 7 },
            { color: '#000000', opacity: 0.9, weight: 11 }
          ],
          extendToWaypoints: true
        },
        createMarker: function(i, wp){
          const outer = L.circleMarker(wp.latLng, {
            radius: 7, color: '#ffffff', weight: 2, fillColor: '#000000', fillOpacity: 1
          });
          return outer;
        },
        addWaypoints: false,
        routeWhileDragging: false,
        showAlternatives: false,
        fitSelectedRoute: true,
        show: false
      }).addTo(map);

      routingControl.on('routesfound', function(e){
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const r = routes[0];
          const timeText = msToTime(r.summary.totalTime * 1000);
          const distKm = (r.summary.totalDistance / 1000).toFixed(1);
          showInfo(`<strong>Estimated:</strong> ${timeText}, ${distKm} km`);
          legendEl.style.display = 'flex';
        }
      });

      routingControl.on('routingerror', function(){
        showInfo('Routing failed. Try again later.', true);
      });
    }

    document.getElementById('addressForm').addEventListener('submit', async function(e){
      e.preventDefault();
      const address = document.getElementById('address').value.trim();
      if(!address){ showInfo('Please type an address.', true); return; }

      showInfo('Searching address...');
      try {
        const results = await geocodeAddress(address);
        if(!results || results.length === 0){
          showInfo('Address not found. Try a different query.', true);
          return;
        }
        const r = results[0];
        const lat = parseFloat(r.lat), lon = parseFloat(r.lon);

        if (window.originMarker) { map.removeLayer(window.originMarker); window.originMarker = null; }
        window.originMarker = L.circleMarker([lat, lon], {
          radius:7, color:'#ffffff', weight:2, fillColor:'#000000', fillOpacity:1
        }).addTo(map).bindPopup(r.display_name).openPopup();

        createRoute([lat, lon], SCHOOL);
      } catch (err){
        console.error(err);
        showInfo('Error while searching. Please try again.', true);
      }
    });

    document.getElementById('locBtn').addEventListener('click', function(){
      if(!navigator.geolocation){
        showInfo('Geolocation not supported by your browser.', true);
        return;
      }
      showInfo('Detecting your location...');
      navigator.geolocation.getCurrentPosition(function(pos){
        const lat = pos.coords.latitude, lon = pos.coords.longitude;
        if (window.originMarker) { map.removeLayer(window.originMarker); window.originMarker = null; }
        window.originMarker = L.circleMarker([lat, lon], {
          radius:7, color:'#ffffff', weight:2, fillColor:'#000000', fillOpacity:1
        }).addTo(map).bindPopup('Your location').openPopup();

        createRoute([lat, lon], SCHOOL);
      }, function(err){
        showInfo('Unable to get location: ' + (err.message || 'permission denied'), true);
      }, { enableHighAccuracy: true, timeout: 10000 });
    });

    map.on('click', function(e){
      const { lat, lng } = e.latlng;
      if (window.originMarker) { map.removeLayer(window.originMarker); window.originMarker = null; }
      window.originMarker = L.circleMarker([lat, lng], {
        radius:7, color:'#ffffff', weight:2, fillColor:'#000000', fillOpacity:1
      }).addTo(map).bindPopup('Selected point').openPopup();
      createRoute([lat, lng], SCHOOL);
      showInfo('Using selected point on map as origin.');
    });

    map.setView([60.224780, 24.75], 12);

    document.getElementById('address').addEventListener('keydown', function(e){
      if (e.key === 'Enter') { e.preventDefault(); document.getElementById('addressForm').dispatchEvent(new Event('submit')); }
    });
