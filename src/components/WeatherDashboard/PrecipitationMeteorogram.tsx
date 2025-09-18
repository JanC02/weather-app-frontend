import type { HourlyDataType } from '../../types.ts';
import ReactApexChart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import MeteorogramWrapper from './MeteorogramWrapper.tsx';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import { useEffect, useState } from 'react';

type PrecipitationMeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function PrecipitationMeteorogram({ hourlyWeather }: PrecipitationMeteorogramProps) {
    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (theme === 'system') {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        } else {
            setIsDark(theme === 'dark');
        }
    }, [theme]);

    const series = [
        {
            name: 'precipitation',
            data: hourlyWeather.map(item => item.precipitation),
            type: 'column',
            yAxisIndex: 0,
        },
        {
            name: 'humidity',
            data: hourlyWeather.map(item => item.humidity),
            type: 'line',
            yAxisIndex: 1,
        }
    ];

    const options: ApexOptions = {
        chart: {
            height: 300,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: [0, 3],
        },
        colors: ['#3b82f6','#f97316'],
        xaxis: {
            categories: hourlyWeather.map(item => item.label),
            labels: {
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                style: {
                    fontSize: '10px',
                    colors: isDark ? '#9ca3af' : '#6b7280'
                },
            },
            tickAmount: Math.round(hourlyWeather.length / 4),
        },
        yaxis: [
            {
                seriesName: 'precipitation',
                title: {
                    text: 'Opady (mm)',
                    style: {
                        color: isDark ? '#9ca3af' : '#6b7280'
                    }
                },
                labels: {
                    style: {
                        fontSize: '11px',
                        colors: isDark ? '#9ca3af' : '#6b7280'
                    }
                },
                min: 0,
            },
            {
                seriesName: 'humidity',
                opposite: true,
                title: {
                    text: 'Wilgotność (%)',
                },
                labels: {
                    style: {
                        fontSize: '11px',
                    }
                },
                min: 0,
                max: 100,
                show: false
            }
        ],
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            custom: function({ dataPointIndex }) {
                const precipitation = hourlyWeather[dataPointIndex].precipitation;
                const humidity = hourlyWeather[dataPointIndex].humidity;
                return '<div class="bg-gray-50 dark:bg-slate-700 p-2 rounded-lg text-sm shadow-lg">' +
                    '<p class="label">Opady: ' + precipitation + ' mm</p>' +
                    '<p class="desc">Wilgotność: ' + humidity + ' %</p>' +
                    '</div>';
            }
        },
        grid: {
            borderColor: isDark ? '#334155' : '#e5e7eb',
            padding: {
                bottom: 25,
                left: 25
            }
        },
        legend: {
            show: false
        }
    };

    return (
        <MeteorogramWrapper>
            <ReactApexChart options={options} series={series} type="line" height={300} />
        </MeteorogramWrapper>
    );
}