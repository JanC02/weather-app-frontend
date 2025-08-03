import * as z from "zod";

const CurrentSchema = z.object({
    interval: z.number(),
    pressure_msl: z.number(),
    temperature_2m: z.number(),
    time: z.iso.datetime(),
    weather_code: z.number()
});

const CurrentUnitsSchema = z.object({
    interval: z.literal('seconds'),
    pressure_msl: z.literal('hPa'),
    temperature_2m: z.literal('°C'),
    time: z.literal('iso8601'),
    weather_code: z.literal('wmo code')
});

const DailySchema = z.object({
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    time: z.array(z.string())
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

export type WeatherDataType = z.infer<typeof WeatherDataSchema>;