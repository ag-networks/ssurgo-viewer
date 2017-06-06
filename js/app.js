// Configurable Geoserver Vector Tile Viewer

// Accepts one Geoserver Vector Tile polygon layer, along with 
// configuration options and multiple Mapbox GL styles. 
// This app loops through the styles, uses the name of the style within 
// the style picker, and applies the style on the client side.
// Also in the config.js file are the display fields that the
// info popup uses to display feature information.

var VectorTileViewer = function(){
  var self = this;
  
  // Build a list of styles and populate the style picker select options
  self.listStyles = function() {
    var stylesList = [];
    var stylePicker = document.getElementById("style-options");

    // Loop through the cartographic styles and look for distinct style defs
    config.glStyle.layers.forEach(function(style) {
      if (!stylesList.includes(style.source)) {
        stylesList.push(style.source);
      }
    });

    // Populate the select options
    for (var i = 0; i < stylesList.length; i++) {
      stylePicker.options[stylePicker.options.length] = new Option(stylesList[i], stylesList[i]);
    }

    stylePicker.addEventListener('change', function(e) {
      self.styleVTiles(e.target.value);
    });
  }

  // Define the main Geoserver VectorTile layer
  this.vTiles = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      tilePixelRatio: 1,
      tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
      format: new ol.format.MVT(),
      url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' + config.gsLayer +
          '@EPSG%3A' + config.gsLayerEspg + '@pbf/{z}/{x}/{-y}.pbf'
    })
  });

  // Set up the OpenLayers map
  // This section isn't included in the config file, but updating base maps, center
  // and zoom is pretty straightforward to do here.
  self.map = new ol.Map({
    target: 'map',
    view: new ol.View({
      center: ol.proj.transform([-76.9347, 40.8104], 'EPSG:4326', 'EPSG:3857'),
      zoom: 13
    }),
    layers: [
      new ol.layer.Group({
        'title': 'Base maps',
        layers: [
          new ol.layer.Tile({
            title: 'Esri World Imagery',
            type: 'base',
            visible: 'false',
            source: new ol.source.XYZ({
              attributions: [
                new ol.Attribution({
                  html: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                })
              ],
              url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
          }),
          new ol.layer.Tile({
            title: 'Stamen Toner',
            type: 'base',
            visible: 'true',
            source: new ol.source.Stamen({ layer: "toner" })
          })
        ]
      }),
      // Include the VectorTile layer
      self.vTiles
    ]
  });

  // Add controls and overlays to the map
  self.layerSwitcher = new ol.control.LayerSwitcher();
  self.popup = new ol.Overlay({
    element: document.getElementById('popup'),
    autoPan: true,
    autoPanAnimation: { duration: 250 }
  });

  self.map.addControl(self.layerSwitcher);
  self.map.addOverlay(self.popup);

  // Interactivity for map and popup
  self.map.on('click', function(e) {
    self.displayFeatureInfo(e.pixel, e.coordinate);
  });

  self.closer = document.getElementById('popup-closer');
  self.closer.onclick = function() {
    self.popup.setPosition(undefined);
    closer.blur();
    return false;
  };

  // VectorTile styling
  self.styleVTiles = function(style) {
    olms.applyStyle(this.vTiles, config.glStyle, style);
    self.updateLegend(style);
  }

  // Query the map data and populate the info popup
  self.displayFeatureInfo = function(pixel, coordinate) {

    self.map.forEachFeatureAtPixel(pixel, function(feature) {
      // Only run if there's actually data at the clicked location
      if (feature) {

        // Set up the container and content
        var container = document.getElementById('popup-content');
        var content = '';

        content += '<h3 id="popup-title">' + feature.get(config.nameField) + '</h3>';
        content += '<ul id="content-items">';

        var fields = config.displayFields;
        // Build all the display field info
        for (var i=0; i < fields.length; i++) {
          content += '<li class="content-item">' +
            fields[i].title + ': <span id="content-flooding">' +
            feature.get(fields[i].fieldName) + fields[i].unit +
            '</span></li>';
        }

        content += '</ul>';

        container.innerHTML = content;
        
        // Once it's all set, display the popup
        self.popup.setPosition(coordinate);
      }
    })
  };
  
  // Display the appropriate map style info in the legend
  self.updateLegend = function(style) {
    var legend = document.getElementById("legend");

    // Hide the legend if there's nothing interesting to show
    if (style == 'Default') {
      legend.classList.add('hidden');
    }
    else {
      if (legend.classList.contains('hidden')) {
        legend.classList.remove('hidden');
      }

      var legendItems = [];

      // Loop through the styles for this source, looking for fill types
      config.glStyle.layers.forEach(function(item) {
        if (style == item.source && item.type == 'fill') {
          // Grab the name and color in an array
          legendItems.push({ title: item.filter[2], color: item.paint['fill-color'] });
        }
      });
      
      var legendContent = '';

      // Build the legend list items and append them to the legend
      legendItems.forEach(function(item) {
        var itemHtml = '<div class="legend-item"><span class="legend-box" ' + 
          'style="background-color:' + item.color + '"></span> ' + 
          item.title + '</div>';
        
        legendContent += itemHtml;
      });

      legend.innerHTML = legendContent;
    }
  }

  // Run necessary functions to get things going
  self.init = function(){
    self.listStyles();
    self.styleVTiles('Default');
  };

};

// Instantiate the app
var app = new VectorTileViewer();

// Aaaannnnd... go
app.init();
