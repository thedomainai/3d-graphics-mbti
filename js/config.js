/**
 * 16 Personalities 3D Visualization
 * Configuration and Constants
 */

export const CONFIG = {
    // Camera settings
    camera: {
        fov: 40,
        near: 1,
        far: 20000,
        initialZ: 4000,      // Adjusted: closer initial view
        minDistance: 800,    // Adjusted: minimum zoom distance
        maxDistance: 6000    // Adjusted: maximum zoom distance (was too far)
    },

    // Animation settings
    animation: {
        transitionDuration: 2000
    },

    // Layout settings
    layout: {
        // Table layout (8 columns x 4 rows)
        table: {
            columnSpacing: 200,
            rowSpacing: 500,
            offsetX: -700,   // Center offset for 8 columns
            offsetY: 750     // Vertical offset
        },
        // Sphere layout
        sphere: {
            radius: 800
        },
        // Helix layout
        helix: {
            radius: 1200,
            spacing: 45,
            offsetY: 700
        },
        // Grid layout
        grid: {
            rows: 4,
            columnSpacing: 300,
            rowSpacing: 400
        }
    },

    // Initial random position range
    randomRange: 4000,

    // Card dimensions (for reference)
    card: {
        width: 120,
        height: 160
    },

    // Group colors (RGB values for lines)
    groupColors: {
        analyst: { r: 136, g: 97, b: 154 },
        diplomat: { r: 51, g: 164, b: 116 },
        sentinel: { r: 66, g: 152, b: 180 },
        explorer: { r: 228, g: 174, b: 58 }
    }
};

// Layout button configuration
export const LAYOUT_BUTTONS = [
    { id: 'table', icon: '⊞', label: 'テーブル' },
    { id: 'sphere', icon: '◯', label: '球体' },
    { id: 'helix', icon: '🧬', label: 'らせん' },
    { id: 'grid', icon: '▦', label: 'グリッド' }
];

// Icon path template
export const getIconPath = (mbtiType) => {
    const baseType = mbtiType.replace(/-[AT]$/, '').toLowerCase();
    const groups = {
        'intj': 'analysts', 'intp': 'analysts', 'entj': 'analysts', 'entp': 'analysts',
        'infj': 'diplomats', 'infp': 'diplomats', 'enfj': 'diplomats', 'enfp': 'diplomats',
        'istj': 'sentinels', 'isfj': 'sentinels', 'estj': 'sentinels', 'esfj': 'sentinels',
        'istp': 'explorers', 'isfp': 'explorers', 'estp': 'explorers', 'esfp': 'explorers'
    };
    const group = groups[baseType] || 'unknown';
    return `images/${group}/${baseType}.png`;
};
