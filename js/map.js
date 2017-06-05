var gsLayer = 'ssurgo:soil_types';
var gsLayerEspg = '900913';

var popup = new ol.Overlay({
  element: document.getElementById('popup'),
  autoPan: true,
  autoPanAnimation: { duration: 250 }
});

var soils = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    tilePixelRatio: 1,
    tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
    format: new ol.format.MVT(),
    url: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/' + gsLayer +
        '@EPSG%3A'+gsLayerEspg+'@pbf/{z}/{x}/{-y}.pbf'
  })
});

var map = new ol.Map({
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
    soils
  ]
});

var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);

map.addOverlay(popup);

map.on('click', function(e) {
  //popup.setPosition(e.coordinate);
  displayFeatureInfo(e.pixel, e.coordinate);
});

styleSoils('Default');