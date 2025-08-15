import type { ReactNode } from 'react';

type DashboardItemProps = {
    children: ReactNode,
    className?: string
};

export default function DashboardItem({ children, className }: DashboardItemProps) {
    return <div className={`bg-white p-6 rounded-lg shadow-sm ${className ? className : ''}`}>
        {children}
    </div>;
}