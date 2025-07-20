import { use } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

export const useWeather = () => {
    const context = use(WeatherContext);

    if (!context) {
        throw new Error('WeatherContext not available.');
    }

    return context;
};