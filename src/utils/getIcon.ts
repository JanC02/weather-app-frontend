import React from 'react';
import DaySunny from '../assets/icons/wi--day-sunny.svg?react';
import DaySunnyOvercast from '../assets/icons/wi--day-sunny-overcast.svg?react';
import DayCloudy from '../assets/icons/wi--day-cloudy.svg?react';

import Cloudy from '../assets/icons/wi--cloud.svg?react';
import Fog from '../assets/icons/wi--fog.svg?react';
import Drizzle from '../assets/icons/wi--sprinkle.svg?react';
import Showers from '../assets/icons/wi--showers.svg?react';
import Rain from '../assets/icons/wi--rain.svg?react';
import RainMix from '../assets/icons/wi--rain-mix.svg?react';
import Snow from '../assets/icons/wi--snow.svg?react';
import SnowWind from '../assets/icons/wi--snow-wind.svg?react';
import SnowflakeCold from '../assets/icons/wi--snowflake-cold.svg?react';
import StormShowers from '../assets/icons/wi--storm-showers.svg?react';
import Thunderstorm from '../assets/icons/wi--thunderstorm.svg?react';
import Hail from '../assets/icons/wi--hail.svg?react';

const weatherIcons: Record<number, React.FC<React.SVGProps<SVGSVGElement>>> = {
    0: DaySunny,          // Bezchmurnie (Clear sky)
    1: DaySunnyOvercast,  // Głównie bezchmurnie (Mainly clear)
    2: DayCloudy,         // Częściowe zachmurzenie (Partly cloudy)
    3: Cloudy,            // Zachmurzenie całkowite (Overcast)
    45: Fog,              // Mgła (Fog)
    48: Fog,              // Mgła osadzająca szadź (Depositing rime fog)
    51: Drizzle,          // Lekka mżawka (Light drizzle)
    53: Showers,          // Umiarkowana mżawka (Moderate drizzle)
    55: Rain,             // Gęsta mżawka (Dense drizzle)
    56: RainMix,          // Lekka marznąca mżawka (Light freezing drizzle)
    57: RainMix,          // Gęsta marznąca mżawka (Dense freezing drizzle)
    61: Showers,          // Słabe opady deszczu (Slight rain)
    63: Rain,             // Umiarkowane opady deszczu (Moderate rain)
    65: Rain,             // Intensywne opady deszczu (Heavy rain)
    66: RainMix,          // Słabe opady marznącego deszczu (Light freezing rain)
    67: RainMix,          // Intensywne opady marznącego deszczu (Heavy freezing rain)
    71: Snow,             // Słabe opady śniegu (Slight snow fall)
    73: Snow,             // Umiarkowane opady śniegu (Moderate snow fall)
    75: SnowWind,         // Intensywne opady śniegu (Heavy snow fall)
    77: SnowflakeCold,    // Ziarna śnieżne (Snow grains)
    80: Showers,          // Słabe przelotne opady deszczu (Slight rain showers)
    81: Showers,          // Umiarkowane przelotne opady deszczu (Moderate rain showers)
    82: StormShowers,     // Gwałtowne przelotne opady deszczu (Violent rain showers)
    85: Snow,             // Słabe przelotne opady śniegu (Slight snow showers)
    86: SnowWind,         // Intensywne przelotne opady śniegu (Heavy snow showers)
    95: Thunderstorm,     // Burza z piorunami (Thunderstorm)
    96: Hail,             // Burza z gradem (słaba) (Thunderstorm with slight hail)
    99: Hail,             // Burza z gradem (intensywna) (Thunderstorm with heavy hail)
};

export const getIcon = (weatherCode: number) => weatherIcons[weatherCode];