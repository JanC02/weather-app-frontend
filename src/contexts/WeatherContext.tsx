import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { WeatherService } from "../services/WeatherService.ts";
import { getWeatherDescription } from "../utils/weatherUtils.ts";
import type { DailyWeatherType, HourlyDataType, WeatherState, DashboardStatus, AutocompleteType } from "../types.ts";
import { ZodError } from "zod";
import { dateParser } from "../utils/dateParser.ts";
import { config } from '../config.ts';

type WeatherContextType = {
    weatherData: WeatherState | null;
    fetchWeather: (latitude: number, longitude: number, city: string) => Promise<void>;
    fetchAutocompleteData: (q: string) => Promise<AutocompleteType | []>
    currentStatus: DashboardStatus;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherContextProvider({ children }: { children: ReactNode }) {
    const [weatherData, setWeatherData] = useState<WeatherState| null>(null);
    const [currentStatus, setCurrentStatus] = useState<DashboardStatus>('OK');

    const fetchWeather = async (latitude: number, longitude: number, city: string) => {
        setCurrentStatus('LOADING');
        try {
            const data = await WeatherService.getInstance().getWeather(latitude, longitude, city);
            const description = getWeatherDescription(data.current.weather_code);

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

            const hourlyWeather: HourlyDataType[] = data.hourly.time.map((time, index) => {
                return {
                    temperature: data.hourly.temperature_2m[index],
                    apparentTemperature: data.hourly.apparent_temperature[index],
                    precipitation: data.hourly.precipitation[index],
                    label: index % 24 === 0 ? new Date(time).toLocaleString() : new Date(time).toLocaleTimeString(),
                    humidity: data.hourly.relative_humidity_2m[index],
                }
            });

            const newWeatherData: WeatherState = {
                city,
                current: {
                    temperature: data.current.temperature_2m,
                    weatherCode: data.current.weather_code,
                    pressure: data.current.pressure_msl,
                    humidity: data.current.relative_humidity_2m,
                    isDay: data.current.is_day,
                },
                daily: dailyWeather,
                hourly: hourlyWeather,
            };

            if(description !== 'Wrong weather code.') {
                newWeatherData.current.description = description;
            }

            setCurrentStatus('OK');
            setWeatherData(newWeatherData);
        } catch (error) {
            setCurrentStatus('ERROR');
            if (error instanceof ZodError) {
                console.error('An error has occuered during fetching weather data: ', error.message, error.issues, error.stack);
            } else {
                console.error('An error has occuered during fetching weather data: ', error);
            }
        }
    };

    const fetchAutocompleteData = async (query: string): Promise<AutocompleteType | []> => {
            return await WeatherService.getInstance().getAutocompleteSuggestions(query);
    }

    useEffect(() => {
        if (config.enableSavingLastCity) {
            const service = WeatherService.getInstance();
            if (service.latitude && service.longitude && service.currentCity) {
                fetchWeather(service.latitude, service.longitude, service.currentCity);
            }
        }        
    }, []);

    const value = {
        weatherData,
        fetchWeather,
        fetchAutocompleteData,
        currentStatus
    };

    return (
        <WeatherContext value={value}>
            {children}
        </WeatherContext>
    )
}
