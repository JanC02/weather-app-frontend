import DashboardItem from './DashboardItem.tsx';
import TemperatureMeteorogram from './TemperatureMeteorogram.tsx';
import type { HourlyDataType } from '../../types';

type MeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function Meteorograms({ hourlyWeather }: MeteorogramProps) {
    return (
        <DashboardItem className='h-full flex flex-col'>
            <h3 className="font-bold text-lg mb-2">Meteorogramy</h3>
            <div className="rounded-lg  overflow-x-auto">
                <div className="h-full">
                    <TemperatureMeteorogram hourlyWeather={hourlyWeather} />
                </div>
            </div>
        </DashboardItem>
    )
}