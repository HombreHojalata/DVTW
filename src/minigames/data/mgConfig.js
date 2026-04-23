export const MINI_GAMES = {
    WORDLE: 'wordleMiniGame'
};


export const WORDLE_WORDS = [
    'VOTOS',
    'PODER',
    'LEYES',
    'CARGO',
    'FALSO',
    'PACTO',
    'GENTE',
    'TRATO',
    'DEUDA',
    'CRISIS',
    'RUMOR',
    'ORDEN',
    'BOTOX',
    'MOTOS',
    'DROGA'
];


export const TYPING_CONFIG = {
    DURATION: 30,        // duración del test en segundos
    TOTAL_WORDS: 80,     // cuántas palabras generar en pantalla

    WORDS: [
        'pato', 'voto', 'poder', 'ciudad', 'energia', 'dinero', 'mercado',
        'discurso', 'prensa', 'publico', 'politica', 'alcalde', 'distrito',
        'debate', 'medios', 'escandalo', 'campaña', 'oficina', 'presupuesto',
        'lider', 'multitud', 'promesa', 'impuesto', 'control',
        'agenda', 'ministro', 'nacion', 'crisis', 'reforma'
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