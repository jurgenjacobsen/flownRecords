<template>
  <div id="map" class="h-screen w-full"></div>
</template>

<script setup>
import L from 'leaflet';
import { onMounted } from 'vue';

const props = defineProps({
  flights: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  const points = [];

  props?.flights?.forEach(flight => {
    points.push([flight.from.lat, flight.from.lon]);
    points.push([flight.to.lat, flight.to.lon]);
  });

  const bounds = L.latLngBounds(points);

  const map = L.map('map');
  map.fitBounds(bounds, { padding: [50, 50] });


  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
    attribution:
    `
    &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a> |
    &copy; <a href="https://openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
    `,
    subdomains: 'abcd',
    maxZoom: 10,
  }).addTo(map);

  

  props.flights?.forEach(flight => {
    const from = [flight.from.lat, flight.from.lon];
    const to = [flight.to.lat, flight.to.lon];

    L.polyline([from, to], {
      color: 'grey',
      weight: 2,
      opacity: 0.75,
    }).addTo(map);

    L.circleMarker(from, { radius: 1, color: '#313ED8' }).addTo(map).bindPopup(flight.from.icao);
    L.circleMarker(to, { radius: 1, color: '#313ED8' }).addTo(map).bindPopup(flight.to.icao);
  });
});
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
