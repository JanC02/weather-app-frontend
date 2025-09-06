import type { WeatherDataType, AutocompleteType } from "../types.ts";
import { WeatherDataSchema, AutocompleteSchema } from "../types.ts";
import { ZodError } from "zod";

export class WeatherService {
    private static instance: WeatherService;
    private readonly apiAdress = import.meta.env.VITE_API_PROXY_URL;
    public currentCity: string;
    public latitude: number | null;
    public longitude: number | null;

    private constructor(startCity: string) {
        const latitude = Number(localStorage.getItem('latitude'));
        const longitude = Number(localStorage.getItem('longitude')) 

        this.latitude = !isNaN(latitude) ? latitude : null;
        this.longitude = !isNaN(longitude) ? longitude : null;
        this.currentCity = localStorage.getItem('city') || startCity;
    }

    async getWeather(latitude: number, longitude: number, city: string): Promise<WeatherDataType> {
        this.currentCity = city;
        localStorage.setItem('latitude', latitude.toString());
        localStorage.setItem('longitude', longitude.toString());
        localStorage.setItem('city', city.toString());

        const response = await fetch(`${this.apiAdress}/api/weather/current?lat=${latitude}&lon=${longitude}`);

        if (response.ok) {
            const data = await response.json();
            WeatherDataSchema.parse(data);
            return data;
        } else {
            throw new Error(`${response.statusText}: ${response.status}`);
        }
    }

    async getAutocompleteSuggestions(query: string): Promise<AutocompleteType | []> {
        if (!query) {
            return [];
        }

        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            return [];
        }

        try {
            const response = await fetch(`${this.apiAdress}/api/weather/autocomplete?q=${trimmedQuery}`);

            if (response.ok) {
                const data = await response.json();
                AutocompleteSchema.parse(data);

                return data;
            } else {
                throw new Error(`Error fetching autocomplete suggestions. ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            if (error instanceof ZodError) {
                console.error('An error has occuered during fetching autocomplete suggestions: ', error.message, error.issues, error.stack);
            } else {
                console.error('An error has occuered during fetching autocomplete suggestions: ', error);
            }
            return [];
        }

    }

    static initialize() {
        if (!WeatherService.instance) {
            WeatherService.instance = new WeatherService('Tarnów');
        } else {
            throw new Error('Weather service already initialized.');
        }
    }

    static getInstance(): WeatherService {
        return WeatherService.instance;
    }
}