var styles = [];
var picker = document.getElementById("style-options");
var legend = document.getElementById("legend");

glStyle.layers.forEach(function(style) {
  if (!styles.includes(style.source)) {
    styles.push(style.source);
  }
});

picker.addEventListener('change', function(e) {
  styleSoils(e.target.value);
});

for (var i = 0; i < styles.length; i++) {
  picker.options[picker.options.length] = new Option(styles[i], styles[i]);
}

var styleSoils = function(style) {
  olms.applyStyle(soils, glStyle, style);
  updateLegend(style);
}

var displayFeatureInfo = function(pixel, coordinate) {
  var infoName = document.getElementById('popup-title');
  var infoSlope = document.getElementById('content-slope');
  var infoFlood = document.getElementById('content-flooding');
  var infoStorage = document.getElementById('content-storage');
  var infoDrainage = document.getElementById('content-drainage');
  var infoIcc = document.getElementById('content-icc');
  var infoNicc = document.getElementById('content-nicc');
  var infoHydric = document.getElementById('content-hydric');
  map.forEachFeatureAtPixel(pixel, function(feature) {
    if (feature) {
      infoName.textContent = feature.get('muname');
      infoFlood.textContent = feature.get('flodfreqdcd');
      infoStorage.textContent = feature.get('aws0150wta');
      infoDrainage.textContent = feature.get('drclassdcd');
      infoNicc.textContent = feature.get('niccdcd');
      infoHydric.textContent = feature.get('hydclprs');
      popup.setPosition(coordinate);
      var closer = document.getElementById('popup-closer');
      closer.onclick = function() {
        popup.setPosition(undefined);
        closer.blur();
        return false;
      };
    }
  })
};

var updateLegend = function(style) {
  if (style == 'Default') {
    legend.classList.add('hidden');
  }
  else {
    if (legend.classList.contains('hidden')) {
      legend.classList.remove('hidden');
    }

    var legendItems = [];

    // Loop through the styles for this source, looking for fill types
    glStyle.layers.forEach(function(item) {
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

