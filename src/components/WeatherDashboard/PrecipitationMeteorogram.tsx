import type { HourlyDataType } from '../../types.ts';
import ReactApexChart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import MeteorogramWrapper from './MeteorogramWrapper.tsx';

type PrecipitationMeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function PrecipitationMeteorogram({ hourlyWeather }: PrecipitationMeteorogramProps) {
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
        colors: ['#0000ff','#fc7b03'],
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
        yaxis: [
            {
                seriesName: 'precipitation',
                title: {
                    text: 'Opady (mm)',
                },
                labels: {
                    style: {
                        fontSize: '11px',
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
            custom: function({ dataPointIndex }) {
                const precipitation = hourlyWeather[dataPointIndex].precipitation;
                const humidity = hourlyWeather[dataPointIndex].humidity;
                return '<div class="bg-gray-50 p-2 rounded-lg text-sm shadow-lg">' +
                    '<p class="label">Opady: ' + precipitation + ' mm</p>' +
                    '<p class="desc">Wilgotność: ' + humidity + ' %</p>' +
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