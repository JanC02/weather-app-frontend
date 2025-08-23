import DashboardItem from './DashboardItem.tsx';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700,
    },
];

export default function Meteorogram() {
    return (
        <DashboardItem className='h-full flex flex-col'>
            <h3 className="font-bold text-lg mb-2">Meteorogram</h3>
            <div className="rounded-lg h-[344px] overflox-x-auto">
                <ResponsiveContainer height="100%">
                    <ComposedChart
                        width={2000}
                        height={400}
                        data={data}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" barSize={20} fill="var(--color-blue-700)" />
                        <Line type="monotone" dataKey="uv" stroke="var(--color-red-500)" strokeWidth={3} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </DashboardItem>
    )
}
