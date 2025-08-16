import DashboardItem from './DashboardItem.tsx';

type PressureProps = {
    pressure: number;
}

export default function Pressure({ pressure } : PressureProps) {
    return <DashboardItem>
        <h3 className="font-bold text-lg mb-2">Ciśnienie</h3>
        <p className="text-4xl font-bold">
            {pressure}
            <span className="text-2xl text-gray-500">&nbsp;hPa</span>
        </p>
    </DashboardItem>
}