import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { WeatherService } from "../services/WeatherService";

type WeatherDataType = {
    city: string;
    temperature: number;
    descripiton?: string;
};

type WeatherContextType = {
    weatherData: WeatherDataType | null;
    fetchWeather: (city: string) => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType>({
    weatherData: {
        city: '',
        temperature: 99999,
        descripiton: ''
    },
    fetchWeather: async () => {}
});

export default function WeatherContextProvider({ children }: { children: ReactNode }) {
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

    const fetchWeather = async (city: string) => {
        try {
            const data = await WeatherService.getInstance().getWeather(city);
            setWeatherData({
                city: city,
                temperature: data.current.temp_c,
                descripiton: data.current.condition.text
            });
        } catch (error) {
            console.error('An error has occuered during fetching weather data: ', error);
        }
    };

    useEffect(() => {
        fetchWeather(WeatherService.getInstance().currentCity)
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