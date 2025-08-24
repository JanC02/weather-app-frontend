import type { ReactNode } from 'react';

type MeteorogramWrapperProps = {
    children: ReactNode
};

export default function MeteorogramWrapper({ children }: MeteorogramWrapperProps) {
    return (
        <div className='w-500'>
            {children}
        </div>
    )
}