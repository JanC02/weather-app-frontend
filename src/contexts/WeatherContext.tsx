import { createContext } from "react";
import type { ReactNode } from "react";

type WeatherContextType = {
    city: string;
    temperature: number;
}

const WeatherContext = createContext<WeatherContextType>({
    city: '',
    temperature: 9999999
});

export default function WeatherContextProvider({ children }: { children: ReactNode }) {
    
}