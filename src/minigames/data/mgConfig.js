export const MINI_GAMES = {
    WORDLE: 'wordleMiniGame'
};


export const WORDLE_WORDS = [
    'DUCKS',
    'VOTES',
    'MAYOR',
    'MEDIA',
    'MONEY',
    'POWER',
    'TRIAL',
    'CROOK',
    'CHAOS',
    'LAUGH',
    'QUACK',
    'PRESS'
];

export const WORD_SEARCH_WORDS = [
    ['DUCKS', 'PRESS', 'VOTES', 'QUACK', 'MAYOR', 'LAUGH'],
    ['MEDIA', 'CHAOS', 'MONEY', 'CROOK', 'POWER', 'TRIAL']
];


export const TYPING_CONFIG = {
    DURATION: 30,        // duración del test en segundos
    TOTAL_WORDS: 80,     // cuántas palabras generar en pantalla

    WORDS: [
        'duck', 'vote', 'power', 'city', 'energy', 'money', 'market',
        'speech', 'press', 'public', 'policy', 'mayor', 'district',
        'debate', 'media', 'scandal', 'campaign', 'office', 'budget',
        'leader', 'crowd', 'promise', 'tax', 'speech', 'control',
        'agenda', 'minister', 'nation', 'crisis', 'reform'
    ],

    REWARDS: {
        MONEY_PER_WPM: 10,
        POPULARITY_THRESHOLDS: [
            { wpm: 40, value: 1 },
            { wpm: 60, value: 1 }
        ],
        ACCURACY_BONUS: {
            threshold: 95,
            value: 1
        },
        ENERGY_COST: -5
    }
};