var glStyle = {
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
        "line-color": "#fff",
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
        "fill-color": "#253494",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "poor",
      "type": "fill",
      "source": "Drainage",
      "filter": ["==", "drclassdcd", "Poorly drained"],
      "paint": {
        "fill-color": "#2a6fb0",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "somewhat-poor",
      "type": "fill",
      "source": "Drainage",
      "filter": ["==", "drclassdcd", "Somewhat poorly drained"],
      "paint": {
        "fill-color": "#38a0bf",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "moderately-well",
      "type": "fill",
      "source": "Drainage",
      "filter": ["==", "drclassdcd", "Moderately well drained"],
      "paint": {
        "fill-color": "#67c4bd",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "well",
      "type": "fill",
      "source": "Drainage",
      "filter": ["==", "drclassdcd", "Well drained"],
      "paint": {
        "fill-color": "#b3e1b8",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "somewhat-excessive",
      "type": "fill",
      "source": "Drainage",
      "filter": ["==", "drclassdcd", "Somewhat excessively drained"],
      "paint": {
        "fill-color": "#ffffcc",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "outlines",
      "type": "line",
      "source": "Drainage",
      "paint": {
        "line-color": "#8cadbf",
        "line-width": 0.1
      }
    }
  ]
};