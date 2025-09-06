import { use } from 'react';
import { WeatherContext } from '../contexts/WeatherContext.tsx';

export const useWeather = () => {
    const context = use(WeatherContext);

    if (!context) {
        throw new Error('WeatherContext not available.');
    }

    return context;
};