import type { ReactNode } from "react";

type MainContainerProps = {
    children: ReactNode;
};

export default function MainContainer({ children }: MainContainerProps) {
    return (
        <main className='flex-1 flex justify-center bg-stone-50'>
            {children}
        </main>
    )
}