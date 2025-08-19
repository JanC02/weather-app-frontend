import * as z from "zod";

const CurrentSchema = z.object({
    interval: z.number(),
    pressure_msl: z.number(),
    temperature_2m: z.number(),
    time: z.string(),
    weather_code: z.number(),
    relative_humidity_2m: z.number(),
    is_day: z.union([z.literal(0), z.literal(1)])
});

const CurrentUnitsSchema = z.object({
    interval: z.literal('seconds'),
    pressure_msl: z.literal('hPa'),
    temperature_2m: z.literal('°C'),
    time: z.literal('iso8601'),
    weather_code: z.literal('wmo code'),
    relative_humidity_2m: z.literal('%')
});

const DailySchema = z.object({
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    time: z.array(z.string()),
    weather_code: z.array(z.number())
});

const DailyUnitsSchema = z.object({
    temperature_2m_max: z.literal('°C'),
    temperature_2m_min: z.literal('°C'),
    time: z.literal('iso8601')
});

export const WeatherDataSchema = z.object({
    current: CurrentSchema,
    current_units: CurrentUnitsSchema,
    daily: DailySchema,
    daily_units: DailyUnitsSchema,
    elevation: z.number(),
    generationtime_ms: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
    timezone_abbreviation: z.string(),
    utc_offset_seconds: z.number()
});

const AutocompleteResultSchema = z.object({
    admin1: z.string().optional(),
    admin1_id: z.number().optional(),
    admin2: z.string().optional(),
    admin2_id: z.number().optional(),
    admin3: z.string().optional(),
    admin3_id: z.number().optional(),
    admin4: z.string().optional(),
    admin4_id: z.number().optional(),
    country: z.string().optional(),
    country_code: z.string(),
    country_id: z.number().optional(),
    elevation: z.number().optional(),
    feature_code: z.string(),
    id: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    name: z.string(),
    population: z.number().optional(),
    postcodes: z.array(z.string()).optional(),
    timezone: z.string()
});

export const AutocompleteSchema = z.object({
    generationtime_ms: z.number(),
    results: z.array(AutocompleteResultSchema).default([])
});

export type WeatherDataType = z.infer<typeof WeatherDataSchema>;
export type AutocompleteType = z.infer<typeof AutocompleteSchema>;