/**
 * 16 Personalities 3D Visualization
 * Personality Types and Compatibility Data
 */

// 32 Personality Types (16 types × 2 variants: Assertive/Turbulent)
// Format: [code, name, group, emoji, column, row]
export const PERSONALITIES = [
    // Analysts (Purple)
    ['INTJ-A', '建築家', 'analyst', '🧠', 1, 1],
    ['INTJ-T', '建築家', 'analyst', '🧠', 2, 1],
    ['INTP-A', '論理学者', 'analyst', '🔬', 3, 1],
    ['INTP-T', '論理学者', 'analyst', '🔬', 4, 1],
    ['ENTJ-A', '指揮官', 'analyst', '👑', 5, 1],
    ['ENTJ-T', '指揮官', 'analyst', '👑', 6, 1],
    ['ENTP-A', '討論者', 'analyst', '💡', 7, 1],
    ['ENTP-T', '討論者', 'analyst', '💡', 8, 1],
    
    // Diplomats (Green)
    ['INFJ-A', '提唱者', 'diplomat', '🌟', 1, 2],
    ['INFJ-T', '提唱者', 'diplomat', '🌟', 2, 2],
    ['INFP-A', '仲介者', 'diplomat', '🦋', 3, 2],
    ['INFP-T', '仲介者', 'diplomat', '🦋', 4, 2],
    ['ENFJ-A', '主人公', 'diplomat', '🎭', 5, 2],
    ['ENFJ-T', '主人公', 'diplomat', '🎭', 6, 2],
    ['ENFP-A', '運動家', 'diplomat', '🌈', 7, 2],
    ['ENFP-T', '運動家', 'diplomat', '🌈', 8, 2],
    
    // Sentinels (Blue)
    ['ISTJ-A', 'ロジスティシャン', 'sentinel', '📊', 1, 3],
    ['ISTJ-T', 'ロジスティシャン', 'sentinel', '📊', 2, 3],
    ['ISFJ-A', '擁護者', 'sentinel', '🛡️', 3, 3],
    ['ISFJ-T', '擁護者', 'sentinel', '🛡️', 4, 3],
    ['ESTJ-A', '幹部', 'sentinel', '📋', 5, 3],
    ['ESTJ-T', '幹部', 'sentinel', '📋', 6, 3],
    ['ESFJ-A', '領事', 'sentinel', '🤝', 7, 3],
    ['ESFJ-T', '領事', 'sentinel', '🤝', 8, 3],
    
    // Explorers (Yellow)
    ['ISTP-A', '巨匠', 'explorer', '🔧', 1, 4],
    ['ISTP-T', '巨匠', 'explorer', '🔧', 2, 4],
    ['ISFP-A', '冒険家', 'explorer', '🎨', 3, 4],
    ['ISFP-T', '冒険家', 'explorer', '🎨', 4, 4],
    ['ESTP-A', '起業家', 'explorer', '🚀', 5, 4],
    ['ESTP-T', '起業家', 'explorer', '🚀', 6, 4],
    ['ESFP-A', 'エンターテイナー', 'explorer', '🎉', 7, 4],
    ['ESFP-T', 'エンターテイナー', 'explorer', '🎉', 8, 4]
];

// Compatibility data for work and love relationships
export const COMPATIBILITY_DATA = {
    'INFJ-A': {
        work: [
            { target: 'ENTP-A', priority: '最良' },
            { target: 'ENFP-A', priority: '良' },
            { target: 'INTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ENFP-A', priority: '最良' },
            { target: 'ENTP-A', priority: '良' },
            { target: 'INTJ-A', priority: '良' }
        ]
    },
    'INFJ-T': {
        work: [
            { target: 'ENFJ-A', priority: '最良' },
            { target: 'INFP-A', priority: '良' },
            { target: 'ENTP-A', priority: '良' }
        ],
        love: [
            { target: 'ENTP-A', priority: '最良' },
            { target: 'ENFJ-A', priority: '良' },
            { target: 'ENFP-T', priority: '良' }
        ]
    },
    'INFP-A': {
        work: [
            { target: 'ENTJ-A', priority: '最良' },
            { target: 'ENFJ-A', priority: '良' },
            { target: 'INTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ENFJ-A', priority: '最良' },
            { target: 'ENTJ-A', priority: '良' },
            { target: 'ENFP-A', priority: '良' }
        ]
    },
    'INFP-T': {
        work: [
            { target: 'ENFJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ENTJ-A', priority: '最良' },
            { target: 'ENFJ-A', priority: '良' },
            { target: 'INFJ-A', priority: '良' }
        ]
    },
    'ENFJ-A': {
        work: [
            { target: 'INFP-A', priority: '最良' },
            { target: 'ISFP-A', priority: '良' },
            { target: 'INFJ-A', priority: '良' }
        ],
        love: [
            { target: 'INFP-T', priority: '最良' },
            { target: 'INFP-A', priority: '良' },
            { target: 'ISFP-A', priority: '良' }
        ]
    },
    'ENFJ-T': {
        work: [
            { target: 'INTJ-A', priority: '最良' },
            { target: 'ISTJ-A', priority: '良' },
            { target: 'INFJ-T', priority: '良' }
        ],
        love: [
            { target: 'INFP-A', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'ENFP-A', priority: '良' }
        ]
    },
    'ENFP-A': {
        work: [
            { target: 'INFJ-A', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'ENTP-A', priority: '良' }
        ],
        love: [
            { target: 'INTJ-T', priority: '最良' },
            { target: 'INFJ-A', priority: '良' },
            { target: 'INTJ-A', priority: '良' }
        ]
    },
    'ENFP-T': {
        work: [
            { target: 'INTJ-A', priority: '最良' },
            { target: 'ENTJ-A', priority: '良' },
            { target: 'INFJ-T', priority: '良' }
        ],
        love: [
            { target: 'INTJ-A', priority: '最良' },
            { target: 'INFJ-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ]
    },
    'ISTJ-A': {
        work: [
            { target: 'ESTP-A', priority: '最良' },
            { target: 'ESFP-A', priority: '良' },
            { target: 'ESTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESFP-A', priority: '最良' },
            { target: 'ESTP-A', priority: '良' },
            { target: 'ISFJ-A', priority: '良' }
        ]
    },
    'ISTJ-T': {
        work: [
            { target: 'ESTJ-A', priority: '最良' },
            { target: 'ISTP-A', priority: '良' },
            { target: 'ISFJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESFP-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ISFJ-T', priority: '良' }
        ]
    },
    'ISFJ-A': {
        work: [
            { target: 'ESTJ-A', priority: '最良' },
            { target: 'ESFJ-A', priority: '良' },
            { target: 'ISTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESTP-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ESFJ-A', priority: '良' }
        ]
    },
    'ISFJ-T': {
        work: [
            { target: 'ESFJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ISFP-A', priority: '良' }
        ],
        love: [
            { target: 'ESFP-A', priority: '最良' },
            { target: 'ESFJ-A', priority: '良' },
            { target: 'ESTJ-A', priority: '良' }
        ]
    },
    'ESTJ-A': {
        work: [
            { target: 'ISTP-A', priority: '最良' },
            { target: 'ISTJ-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ISFP-A', priority: '最良' },
            { target: 'INTP-A', priority: '良' },
            { target: 'ISTP-A', priority: '良' }
        ]
    },
    'ESTJ-T': {
        work: [
            { target: 'ISTJ-A', priority: '最良' },
            { target: 'ISFJ-A', priority: '良' },
            { target: 'ISTP-A', priority: '良' }
        ],
        love: [
            { target: 'ISTP-A', priority: '最良' },
            { target: 'ISFP-A', priority: '良' },
            { target: 'ISTJ-A', priority: '良' }
        ]
    },
    'ESFJ-A': {
        work: [
            { target: 'ISFP-A', priority: '最良' },
            { target: 'ISFJ-A', priority: '良' },
            { target: 'ESFP-A', priority: '良' }
        ],
        love: [
            { target: 'ISFP-A', priority: '最良' },
            { target: 'ISTP-A', priority: '良' },
            { target: 'ISFJ-A', priority: '良' }
        ]
    },
    'ESFJ-T': {
        work: [
            { target: 'ISFJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ISFP-A', priority: '良' }
        ],
        love: [
            { target: 'ISTP-A', priority: '最良' },
            { target: 'ISFP-A', priority: '良' },
            { target: 'ISTJ-A', priority: '良' }
        ]
    },
    'INTJ-A': {
        work: [
            { target: 'ENTP-A', priority: '最良' },
            { target: 'ENTJ-A', priority: '良' },
            { target: 'INTP-A', priority: '良' }
        ],
        love: [
            { target: 'ENFP-A', priority: '最良' },
            { target: 'ENTP-A', priority: '良' },
            { target: 'INFJ-A', priority: '良' }
        ]
    },
    'INTJ-T': {
        work: [
            { target: 'ENTJ-A', priority: '最良' },
            { target: 'ENTP-A', priority: '良' },
            { target: 'INFJ-A', priority: '良' }
        ],
        love: [
            { target: 'ENFP-A', priority: '最良' },
            { target: 'ENTP-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ]
    },
    'INTP-A': {
        work: [
            { target: 'ENTJ-A', priority: '最良' },
            { target: 'ENTP-A', priority: '良' },
            { target: 'INTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ENTJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ENTP-A', priority: '良' }
        ]
    },
    'INTP-T': {
        work: [
            { target: 'ENTP-A', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ENTJ-A', priority: '最良' },
            { target: 'ENFJ-A', priority: '良' },
            { target: 'ESTJ-A', priority: '良' }
        ]
    },
    'ENTJ-A': {
        work: [
            { target: 'INTP-A', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'ENTP-A', priority: '良' }
        ],
        love: [
            { target: 'INFP-A', priority: '最良' },
            { target: 'INTP-A', priority: '良' },
            { target: 'ENFP-A', priority: '良' }
        ]
    },
    'ENTJ-T': {
        work: [
            { target: 'INTJ-A', priority: '最良' },
            { target: 'INTP-A', priority: '良' },
            { target: 'ISTJ-A', priority: '良' }
        ],
        love: [
            { target: 'INTP-A', priority: '最良' },
            { target: 'INFP-A', priority: '良' },
            { target: 'INTJ-A', priority: '良' }
        ]
    },
    'ENTP-A': {
        work: [
            { target: 'INTJ-A', priority: '最良' },
            { target: 'INFJ-A', priority: '良' },
            { target: 'INTP-A', priority: '良' }
        ],
        love: [
            { target: 'INFJ-A', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'ENFP-A', priority: '良' }
        ]
    },
    'ENTP-T': {
        work: [
            { target: 'INFJ-A', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ],
        love: [
            { target: 'INFJ-T', priority: '最良' },
            { target: 'INTJ-A', priority: '良' },
            { target: 'INFJ-A', priority: '良' }
        ]
    },
    'ISTP-A': {
        work: [
            { target: 'ESTJ-A', priority: '最良' },
            { target: 'ESTP-A', priority: '良' },
            { target: 'ENTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESFJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ESTP-A', priority: '良' }
        ]
    },
    'ISTP-T': {
        work: [
            { target: 'ESTP-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ISTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESFJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ESTP-A', priority: '良' }
        ]
    },
    'ISFP-A': {
        work: [
            { target: 'ESFJ-A', priority: '最良' },
            { target: 'ENFJ-A', priority: '良' },
            { target: 'ESTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESTJ-A', priority: '最良' },
            { target: 'ESFJ-A', priority: '良' },
            { target: 'ENFJ-A', priority: '良' }
        ]
    },
    'ISFP-T': {
        work: [
            { target: 'ENFJ-A', priority: '最良' },
            { target: 'ESFJ-A', priority: '良' },
            { target: 'ESTJ-A', priority: '良' }
        ],
        love: [
            { target: 'ESFJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ENFJ-A', priority: '良' }
        ]
    },
    'ESTP-A': {
        work: [
            { target: 'ISTJ-A', priority: '最良' },
            { target: 'ENTJ-A', priority: '良' },
            { target: 'ESFP-A', priority: '良' }
        ],
        love: [
            { target: 'ISFJ-A', priority: '最良' },
            { target: 'ISTJ-A', priority: '良' },
            { target: 'ESFP-A', priority: '良' }
        ]
    },
    'ESTP-T': {
        work: [
            { target: 'ISTJ-A', priority: '最良' },
            { target: 'ESTJ-A', priority: '良' },
            { target: 'ISFJ-A', priority: '良' }
        ],
        love: [
            { target: 'ISFJ-T', priority: '最良' },
            { target: 'ISTJ-A', priority: '良' },
            { target: 'ESFJ-A', priority: '良' }
        ]
    },
    'ESFP-A': {
        work: [
            { target: 'ISTJ-A', priority: '最良' },
            { target: 'ESTP-A', priority: '良' },
            { target: 'ISFJ-A', priority: '良' }
        ],
        love: [
            { target: 'ISTJ-A', priority: '最良' },
            { target: 'ISFJ-A', priority: '良' },
            { target: 'ESTP-A', priority: '良' }
        ]
    },
    'ESFP-T': {
        work: [
            { target: 'ISFJ-A', priority: '最良' },
            { target: 'ESFJ-A', priority: '良' },
            { target: 'ISTJ-T', priority: '良' }
        ],
        love: [
            { target: 'ISTJ-T', priority: '最良' },
            { target: 'ISFJ-A', priority: '良' },
            { target: 'ISTP-A', priority: '良' }
        ]
    }
};

// Helper function to get personality by code
export const getPersonalityByCode = (code) => {
    return PERSONALITIES.find(p => p[0] === code);
};

// Helper function to get compatibility data
export const getCompatibility = (code) => {
    return COMPATIBILITY_DATA[code] || { work: [], love: [] };
};
