var View = function(){
  var self = this;
  
  self.listStyles = function() {
    var stylesList = [];
    var stylePicker = document.getElementById("style-options");

    config.glStyle.layers.forEach(function(style) {
      if (!stylesList.includes(style.source)) {
        stylesList.push(style.source);
      }
    });

    for (var i = 0; i < stylesList.length; i++) {
      stylePicker.options[stylePicker.options.length] = new Option(stylesList[i], stylesList[i]);
    }

    stylePicker.addEventListener('change', function(e) {
      self.styleVTiles(e.target.value);
    });
  }

  this.vTiles = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      tilePixelRatio: 1,
      tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
      format: new ol.format.MVT(),
      url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' + config.gsLayer +
          '@EPSG%3A' + config.gsLayerEspg + '@pbf/{z}/{x}/{-y}.pbf'
    })
  });

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
          // TODO: Figure out if it's possible to use this - they don't support 3857
          // https://nassgeodata.gmu.edu/CropScape/
          // new ol.layer.Tile({
          //   title: 'CropData Imagery',
          //   type: 'base',
          //   visible: 'false',
          //   source: new ol.source.TileWMS({
          //     url: 'https://nassgeodata.gmu.edu/CropScapeService/wms_cdlall.cgi?',
          //       params: { 'LAYERS': 'cdl_2016', 'SRS': 'EPSG:3857' }
          //   })
          // }),
          new ol.layer.Tile({
            title: 'Stamen Toner',
            type: 'base',
            visible: 'true',
            source: new ol.source.Stamen({ layer: "toner" })
          })
        ]
      }),
      self.vTiles
    ]
  });

  self.layerSwitcher = new ol.control.LayerSwitcher();
  self.popup = new ol.Overlay({
    element: document.getElementById('popup'),
    autoPan: true,
    autoPanAnimation: { duration: 250 }
  });

  self.map.addControl(self.layerSwitcher);
  self.map.addOverlay(self.popup);

  self.map.on('click', function(e) {
    //popup.setPosition(e.coordinate);
    self.displayFeatureInfo(e.pixel, e.coordinate);
  });

  self.styleVTiles = function(style) {
    olms.applyStyle(this.vTiles, config.glStyle, style);
    self.updateLegend(style);
  }

  self.displayFeatureInfo = function(pixel, coordinate) {

    self.map.forEachFeatureAtPixel(pixel, function(feature) {
      if (feature) {

        var container = document.getElementById('popup-content');
        var content = '';

        content += '<h3 id="popup-title">' + feature.get('muname') + '</h3>';
        content += '<ul id="content-items">';

        var fields = config.displayFields;
        for (var i=0; i < fields.length; i++) {
          content += '<li class="content-item">' +
            fields[i].title + ': <span id="content-flooding">' +
            feature.get(fields[i].fieldName) + fields[i].unit +
            '</span></li>';
        }

        content += '</ul>';

        container.innerHTML = content;
        self.popup.setPosition(coordinate);
        var closer = document.getElementById('popup-closer');
        closer.onclick = function() {
          self.popup.setPosition(undefined);
          closer.blur();
          return false;
        };
      }
    })
  };
  
  self.updateLegend = function(style) {
    var legend = document.getElementById("legend");

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

  self.init = function(){
    self.listStyles();
    self.styleVTiles('Default');
  };

};

var view = new View();

view.init();
