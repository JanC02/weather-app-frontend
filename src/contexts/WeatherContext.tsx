import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { WeatherService } from "../services/WeatherService";
import { getWeatherDescription } from "../utils/weatherUtils";
import { type WeatherDataType, type DailyWeatherType } from "../types.ts";
import { ZodError } from "zod";
import { dateParser } from "../utils/dateParser.ts";

type ResultWeatherType = WeatherDataType & {
    city: string;
    dailyWeather: DailyWeatherType[];
    description?: string;
};

type WeatherContextType = {
    weatherData: ResultWeatherType | null;
    fetchWeather: (latitude: number, longitude: number, city: string) => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherContextProvider({ children }: { children: ReactNode }) {
    const [weatherData, setWeatherData] = useState<ResultWeatherType| null>(null);

    const fetchWeather = async (latitude: number, longitude: number, city: string) => {
        try {
            const data = await WeatherService.getInstance().getWeather(latitude, longitude, city);
            const description = getWeatherDescription(data.current.weather_code);

            console.log(data);

            const dailyWeather: DailyWeatherType[] = data.daily.time.map((time, index) => {
                let dayName = dateParser(time)[0];
                if (index === 0) {
                    dayName += ' (dzisiaj)';
                }
                const minTemp = Math.round(data.daily.temperature_2m_min[index]);
                const maxTemp = Math.round(data.daily.temperature_2m_max[index]);
                const weatherCode = data.daily.weather_code[index];

                return { dayName, minTemp, maxTemp, weatherCode };
            });

            const newWeatherData: ResultWeatherType = {
                city,
                dailyWeather,
                ...data
            };

            if (description !== 'Wrong weather code.') {
                newWeatherData.description = description;
            }

            setWeatherData(newWeatherData);          
        } catch (error) {
            if (error instanceof ZodError) {
                console.error('An error has occuered during fetching weather data: ', error.message, error.issues, error.stack);
            } else {
                console.error('An error has occuered during fetching weather data: ', error);
            }
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