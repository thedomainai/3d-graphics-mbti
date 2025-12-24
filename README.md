# 16 Personalities 3D Visualization

Interactive 3D visualization of the 16 MBTI personality types with compatibility analysis.

## Features

- 🎨 **4 Layout Views**: Table, Sphere, Helix, and Grid arrangements
- 🔗 **Compatibility Lines**: Visual connections showing work and love compatibility
- 📊 **32 Personality Variants**: All 16 types with Assertive (-A) and Turbulent (-T) variants
- 🌐 **Interactive 3D**: Rotate, zoom, and pan with mouse/touch controls
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
16personalities/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── config.js           # Configuration and constants
│   ├── data.js             # Personality and compatibility data
│   └── app.js              # Main application logic
├── images/
│   ├── analysts/           # INTJ, INTP, ENTJ, ENTP icons
│   ├── diplomats/          # INFJ, INFP, ENFJ, ENFP icons
│   ├── sentinels/          # ISTJ, ISFJ, ESTJ, ESFJ icons
│   └── explorers/          # ISTP, ISFP, ESTP, ESFP icons
└── README.md               # This file
```

## Usage

1. Open `index.html` in a modern web browser
2. Click on any personality card to see compatibility details
3. Use the bottom menu to switch between layout views
4. Toggle "相性ライン" to show all compatibility connections

## Controls

- **Left Click + Drag**: Rotate view
- **Right Click + Drag**: Pan view
- **Scroll**: Zoom in/out
- **Click Card**: Show compatibility panel

## Technologies

- [Three.js](https://threejs.org/) - 3D rendering
- [CSS3DRenderer](https://threejs.org/docs/#examples/en/renderers/CSS3DRenderer) - DOM element 3D positioning
- [Tween.js](https://github.com/tweenjs/tween.js/) - Animation
- Vanilla JavaScript (ES Modules)

## Personality Groups

| Group | Color | Types |
|-------|-------|-------|
| Analysts | Purple | INTJ, INTP, ENTJ, ENTP |
| Diplomats | Green | INFJ, INFP, ENFJ, ENFP |
| Sentinels | Blue | ISTJ, ISFJ, ESTJ, ESFJ |
| Explorers | Yellow | ISTP, ISFP, ESTP, ESFP |

## License

This project is for educational and personal use.

Personality type information is based on the MBTI framework.
Character illustrations are used for demonstration purposes.
