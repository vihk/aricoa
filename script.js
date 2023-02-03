const key = "VbUecUMwlYJbwknGn9Xu";
const map = new maplibregl.Map({
  container: "map", // container's id or the HTML element in which MapLibre GL JS will render the map
  style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`, // style URL
  center: [-122.25925904232933, 37.87574305310307], // starting position [lng, lat]
  zoom: 4, // starting zoom
});
map.addControl(new maplibregl.NavigationControl(), "top-right");
const marker = new maplibregl.Marker()
  .setLngLat([-122.25925904232933, 37.87574305310307])
  .addTo(map);

markers = [];
areaNames = [];

Papa.parse("Station.csv", {
  header: true,
  download: true,
  complete: function (results) {
    const data = results.data;
    // Add markers
    data.forEach(function (row) {
      const div = document.createElement("div");
      div.textContent = "X";
      div.classList.add("marker-number", "maplibre-gl-marker"); // add a class for styling and marker
      const marker = new maplibregl.Marker({ element: div })
        .setLngLat([row.Long, row.Lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }) // add an offset to the popup
            .setHTML(`<p>ID: ${row.ID}</p><p>Name: ${row.Name}</p>`)
        )
        .addTo(map);
      markers.push(marker);
      areaNames.push(row.nickname);

      let lastRow;
      Papa.parse(
        "https://cors-anywhere.herokuapp.com/" +
          "https://radwatch.berkeley.edu/test/tmp/dosenet/" +
          row.nickname +
          "_month.csv",
        {
          header: true,
          download: true,
          complete: function (results) {
            const data = results.data;
            // Get the last row of the data
            lastRow = data[data.length - 1];
            const div = marker.getElement();
            div.textContent = parseint(lastRow.cpm) * 0.0036;
            console.log(lastRow.cpm);
          },
        }
      );
    });
  },
});

/*
function updateMarkers() {
  Papa.parse("ghs_month.csv", {
    header: true,
    download: true,
    complete: function (results) {
      const data = results.data;
      // Get the last row of the data
      const lastRow = data[data.length - 2];
      console.log(lastRow);
      // Iterate through the markers
      markers.forEach(function (marker) {
        // Get the div element used by the marker
        const div = marker.getElement();
        // Update the text content of the div
        div.textContent = lastRow.cpm;
      });
    },
  });
}
*/
/* 
let lastRow;

Papa.parse("ghs" + "_month.csv", {
  header: true,
  download: true,
  complete: function (results) {
    const data = results.data;
    // Get the last row of the data
    lastRow = data[data.length - 2];
    markers.forEach(function (marker) {
      const div = marker.getElement();
      div.textContent = lastRow.cpm;
    });
  },
});
/* 
/* 
WORKING CODE

const key = "VbUecUMwlYJbwknGn9Xu";
const map = new maplibregl.Map({
  container: "map", // container's id or the HTML element in which MapLibre GL JS will render the map
  style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`, // style URL
  center: [-122.25925904232933, 37.87574305310307], // starting position [lng, lat]
  zoom: 4, // starting zoom
});
map.addControl(new maplibregl.NavigationControl(), "top-right");
const marker = new maplibregl.Marker()
  .setLngLat([-122.25925904232933, 37.87574305310307])
  .addTo(map);

Papa.parse("Station.csv", {
  header: true,
  download: true,
  complete: function (results) {
    const data = results.data;
    // Add markers
    data.forEach(function (row) {
      const marker = new maplibregl.Marker()
        .setLngLat([row.Long, row.Lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }) // add an offset to the popup
            .setHTML(`<p>ID: ${row.ID}</p><p>Name: ${row.Name}</p>`)
        )
        .addTo(map);
    });
  },
});
*/
