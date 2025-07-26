import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { WeatherService } from "../services/WeatherService";
import { getWeatherDescription } from "../utils/weatherUtils";

type WeatherDataType = {
    city: string;
    temperature: number;
    description?: string;
};

type WeatherContextType = {
    weatherData: WeatherDataType | null;
    fetchWeather: (latitude: number, longitude: number, city: string) => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherContextProvider({ children }: { children: ReactNode }) {
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

    const fetchWeather = async (latitude: number, longitude: number, city: string) => {
        try {
            const data = await WeatherService.getInstance().getWeather(latitude, longitude, city);
            const description = getWeatherDescription(data.current.weather_code);

            const newWeatherData: WeatherDataType = {
                city: city,
                temperature: data.current.temperature_2m,
            };

            if (description !== 'Wrong weather code.') {
                newWeatherData.description = description;
            }
            
            setWeatherData(newWeatherData);          
        } catch (error) {
            console.error('An error has occuered during fetching weather data: ', error);
        }
    };

    useEffect(() => {
        const service = WeatherService.getInstance();
        if (service.latitude && service.longitude) {
            fetchWeather(service.latitude, service.longitude, service.currentCity);
        }
    }, []);

    const value = {
        weatherData,
        fetchWeather
    };

    return (
        <WeatherContext value={value}>
            {children}
        </WeatherContext>
    )
}