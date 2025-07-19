export class WeatherService {
    private static instance: WeatherService;
    private readonly apiAdress = import.meta.env.VITE_API_PROXY_URL;
    public currentCity: string;

    private constructor(startCity: string) {
        this.currentCity = startCity;
    }

    async getWeather(city: string) {
        this.currentCity = city;

        try {
            const response = await fetch(`${this.apiAdress}/api/weather/current?city=${city}`);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`${response.statusText}: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
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