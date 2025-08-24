import type { HourlyDataType } from '../../types';
import ReactApexChart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import MeteorogramWrapper from './MeteorogramWrapper.tsx';

type TemperatureMeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function TemperatureMeteorogram({ hourlyWeather }: TemperatureMeteorogramProps) {
    const series = [
        {
            name: 'temperature',
            data: hourlyWeather.map(item => item.temperature),
        },
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
            width: 3,
        },
        colors: ['#ef4444'],
        xaxis: {
            categories: hourlyWeather.map(item => item.label),
            labels: {
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                style: {
                    fontSize: '10px',
                },
            },
            tickAmount: Math.round(hourlyWeather.length / 4),
        },
        yaxis: {
            title: {
                text: 'Temperatura (°C)',
            },
            labels: {
                style: {
                    fontSize: '11px',
                }
            }
        },
        tooltip: {
            custom: function({ dataPointIndex }) {
                const temp = hourlyWeather[dataPointIndex].temperature;
                const apparentTemp = hourlyWeather[dataPointIndex].apparentTemperature;
                return '<div class="bg-gray-50 p-2 rounded-lg text-sm shadow-lg">' +
                    '<p class="label">Temperatura: ' + temp + ' °C</p>' +
                    '<p class="desc">Temperatura odczuwalna: ' + apparentTemp + ' °C</p>' +
                    '</div>';
            }
        },
        grid: {
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
