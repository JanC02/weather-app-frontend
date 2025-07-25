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

    async getWeather(latitude: number, longitude: number, city: string) {
        this.currentCity = city;
        localStorage.setItem('latitude', latitude.toString());
        localStorage.setItem('longitude', longitude.toString());
        localStorage.setItem('city', city.toString());

        try {
            const response = await fetch(`${this.apiAdress}/api/weather/current?lat=${latitude}&lon=${longitude}`);

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

    async getAutocompleteSuggestions(query: string) {
        if (!query) {
            return [];
        }

        try {
            const response = await fetch(`${this.apiAdress}/api/weather/autocomplete?q=${query}`);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Error fetching autocomplete suggestions. ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
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