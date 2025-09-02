import DashboardItem from './DashboardItem.tsx';
import TemperatureMeteorogram from './TemperatureMeteorogram.tsx';
import PrecipitationMeteorogram from './PrecipitationMeteorogram.tsx';
import type { HourlyDataType } from '../../types';

type MeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function Meteorograms({ hourlyWeather }: MeteorogramProps) {
    return (
        <DashboardItem className='h-full flex flex-col grow'>
            <h3 className="font-bold text-lg mb-2 shrink-0">Meteorogramy</h3>
            <div className="rounded-lg overflow-x-auto overflow-y-hidden grow">
                <div className="h-full">
                    <TemperatureMeteorogram hourlyWeather={hourlyWeather} />
                    <PrecipitationMeteorogram hourlyWeather={hourlyWeather} />
                </div>
            </div>
        </DashboardItem>
    )
}