const weatherDescriptions: Record<number, string> = {
    0: 'Bezchmurnie',
    1: 'Głównie bezchmurnie',
    2: 'Częściowe zachmurzenie',
    3: 'Zachmurzenie całkowite',
    45: 'Mgła',
    48: 'Mgła osadzająca szadź',
    51: 'Lekka mżawka',
    53: 'Umiarkowana mżawka',
    55: 'Gęsta mżawka',
    56: 'Lekka marznąca mżawka',
    57: 'Gęsta marznąca mżawka',
    61: 'Słabe opady deszczu',
    63: 'Umiarkowane opady deszczu',
    65: 'Intensywne opady deszczu',
    66: 'Słabe opady marznącego deszczu',
    67: 'Intensywne opady marznącego deszczu',
    71: 'Słabe opady śniegu',
    73: 'Umiarkowane opady śniegu',
    75: 'Intensywne opady śniegu',
    77: 'Ziarna śnieżne',
    80: 'Słabe przelotne opady deszczu',
    81: 'Umiarkowane przelotne opady deszczu',
    82: 'Gwałtowne przelotne opady deszczu',
    85: 'Słabe przelotne opady śniegu',
    86: 'Intensywne przelotne opady śniegu',
    95: 'Burza z piorunami',
    96: 'Burza z gradem (słaba)',
    99: 'Burza z gradem (intensywna)',
}

export const getWeatherDescription = (code: number) => {
    const desc = weatherDescriptions[code];

    if (!desc) {
        return 'Wrong weather code.';
    }

    return desc;
};