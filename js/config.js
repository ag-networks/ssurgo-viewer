var config = {

  gsLayer: 'ssurgo:soil_types',
  gsLayerEspg: '900913',
  nameField: 'musym',
  displayFields: [
    {
      title: 'Flooding Frequency',
      fieldName: 'flodfreqdcd',
      unit: ''
    },
    {
      title: 'Available Water Storage',
      fieldName: 'aws0150wta',
      unit: 'cm'
    },
    {
      title: 'Drainage Class',
      fieldName: 'drclassdcd',
      unit: ''
    },
    {
      title: 'Non-Irrigated Capability Class',
      fieldName: 'niccdcd',
      unit: ''
    },
    {
      title: 'Hydric Soils',
      fieldName: 'hydclprs',
      unit: '%'
    },
  ],
  glStyle: {
    "version": 8,
    "name": "soil-styles",
    "sources": {
      "units": {
        "type": "vector"
      }
    },
    "layers": [
      {
        "id": "default-fill",
        "type": "fill",
        "source": "Default",
        "paint": {
          "fill-color": "#fff",
          "fill-opacity": 0.1
        }
      },
      {
        "id": "default-outlines",
        "type": "line",
        "source": "Default",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      },
      {
        "id": "symbols",
        "type": "fill",
        "source": "Default",
        "minzoom": 15,
        "layout": {
          "text-field": "{musym}",
          "text-size": 10,
          "text-font": ["Arial Normal", "sans-serif Normal"]
        }
      },
      {
        "id": "very-poor",
        "type": "fill",
        "source": "Drainage",
        "filter": ["==", "drclassdcd", "Very poorly drained"],
        "paint": {
          "fill-color": "#2887a1",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "poor",
        "type": "fill",
        "source": "Drainage",
        "filter": ["==", "drclassdcd", "Poorly drained"],
        "paint": {
          "fill-color": "#85adaf",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "somewhat-poor",
        "type": "fill",
        "source": "Drainage",
        "filter": ["==", "drclassdcd", "Somewhat poorly drained"],
        "paint": {
          "fill-color": "#cbd5bc",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "moderately-well",
        "type": "fill",
        "source": "Drainage",
        "filter": ["==", "drclassdcd", "Moderately well drained"],
        "paint": {
          "fill-color": "#e0cfa2",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "well",
        "type": "fill",
        "source": "Drainage",
        "filter": ["==", "drclassdcd", "Well drained"],
        "paint": {
          "fill-color": "#c29b64",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "somewhat-excessive",
        "type": "fill",
        "source": "Drainage",
        "filter": ["==", "drclassdcd", "Somewhat excessively drained"],
        "paint": {
          "fill-color": "#A16928",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "outlines",
        "type": "line",
        "source": "Drainage",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      },
      {
        "id": "flooding-none",
        "type": "fill",
        "source": "Flooding Frequency",
        "filter": ["==", "flodfreqdcd", "None"],
        "paint": {
          "fill-color": "#e4f1e1",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "flooding-rare",
        "type": "fill",
        "source": "Flooding Frequency",
        "filter": ["==", "flodfreqdcd", "Rare"],
        "paint": {
          "fill-color": "#89c0b6",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "flooding-occasional",
        "type": "fill",
        "source": "Flooding Frequency",
        "filter": ["==", "flodfreqdcd", "Occasional"],
        "paint": {
          "fill-color": "#448c8a",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "flooding-frequent",
        "type": "fill",
        "source": "Flooding Frequency",
        "filter": ["==", "flodfreqdcd", "Frequent"],
        "paint": {
          "fill-color": "#0d585f",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "outlines",
        "type": "line",
        "source": "Flooding Frequency",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      },
      {
        "id": "aws-00-06",
        "type": "fill",
        "source": "Available Water Storage (cm)",
        "filter": [">=", "aws0150wta", "0"],
        "paint": {
          "fill-color": "#f3e0f7",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "aws-06-12",
        "type": "fill",
        "source": "Available Water Storage (cm)",
        "filter": [">=", "aws0150wta", "6"],
        "paint": {
          "fill-color": "#e0c2ef",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "aws-12-18",
        "type": "fill",
        "source": "Available Water Storage (cm)",
        "filter": [">=", "aws0150wta", "12"],
        "paint": {
          "fill-color": "#c8a5e4",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "aws-18-24",
        "type": "fill",
        "source": "Available Water Storage (cm)",
        "filter": [">=", "aws0150wta", "18"],
        "paint": {
          "fill-color": "#aa8bd4",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "aws-24-30",
        "type": "fill",
        "source": "Available Water Storage (cm)",
        "filter": [">=", "aws0150wta", "24"],
        "paint": {
          "fill-color": "#8871be",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "aws-30-plus",
        "type": "fill",
        "source": "Available Water Storage (cm)",
        "filter": [">=", "aws0150wta", "30"],
        "paint": {
          "fill-color": "#63589f",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "outlines",
        "type": "line",
        "source": "Available Water Storage (cm)",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      },
      {
        "id": "slope-00-10",
        "type": "fill",
        "source": "Percent Slope",
        "filter": [">=", "slopegraddcp", "0"],
        "paint": {
          "fill-color": "#f6d2a9",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "slope-10-20",
        "type": "fill",
        "source": "Percent Slope",
        "filter": [">=", "slopegraddcp", "10"],
        "paint": {
          "fill-color": "#f4b28a",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "slope-20-30",
        "type": "fill",
        "source": "Percent Slope",
        "filter": [">=", "slopegraddcp", "20"],
        "paint": {
          "fill-color": "#ef9177",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "slope-30-40",
        "type": "fill",
        "source": "Percent Slope",
        "filter": [">=", "slopegraddcp", "30"],
        "paint": {
          "fill-color": "#e3726d",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "slope-40-50",
        "type": "fill",
        "source": "Percent Slope",
        "filter": [">=", "slopegraddcp", "40"],
        "paint": {
          "fill-color": "#cf5669",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "slope-50-plus",
        "type": "fill",
        "source": "Percent Slope",
        "filter": [">=", "slopegraddcp", "50"],
        "paint": {
          "fill-color": "#b13f64",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "outlines",
        "type": "line",
        "source": "Percent Slope",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      },
      {
        "id": "nicc-1",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "1"],
        "paint": {
          "fill-color": "#3d5941",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-2",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "2"],
        "paint": {
          "fill-color": "#778868",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-3",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "3"],
        "paint": {
          "fill-color": "#b5b991",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-4",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "4"],
        "paint": {
          "fill-color": "#f6edbd",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-5",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "5"],
        "paint": {
          "fill-color": "#edbb8a",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-6",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "6"],
        "paint": {
          "fill-color": "#de8a5a",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-7",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "7"],
        "paint": {
          "fill-color": "#ca562c",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "nicc-8",
        "type": "fill",
        "source": "Non-Irrigated Capability Class",
        "filter": ["==", "niccdcd", "8"],
        "paint": {
          "fill-color": "#b13f64",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "outlines",
        "type": "line",
        "source": "Available Water Storage (cm)",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      },
      {
        "id": "hydric-00",
        "type": "fill",
        "source": "Percent Hydric Soils",
        "filter": [">=", "hydclprs", "0"],
        "paint": {
          "fill-color": "#d1eeea",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "hydric-20",
        "type": "fill",
        "source": "Percent Hydric Soils",
        "filter": [">=", "hydclprs", "20"],
        "paint": {
          "fill-color": "#96d0d1",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "hydric-40",
        "type": "fill",
        "source": "Percent Hydric Soils",
        "filter": [">=", "hydclprs", "40"],
        "paint": {
          "fill-color": "#68abb8",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "hydric-60",
        "type": "fill",
        "source": "Percent Hydric Soils",
        "filter": [">=", "hydclprs", "60"],
        "paint": {
          "fill-color": "#45829b",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "hydric-80",
        "type": "fill",
        "source": "Percent Hydric Soils",
        "filter": [">=", "hydclprs", "80"],
        "paint": {
          "fill-color": "#2a5674",
          "fill-opacity": 0.5
        }
      },
      {
        "id": "outlines",
        "type": "line",
        "source": "Percent Hydric Soils",
        "paint": {
          "line-color": "#bbbebf",
          "line-width": 0.1
        }
      }
    ]
  }
};