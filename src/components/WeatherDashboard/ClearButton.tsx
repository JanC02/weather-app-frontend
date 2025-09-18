import ClearIcon from '../../assets/icons/clear-icon.svg?react';

export default function ClearButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className='absolute right-6 cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition duration-50'>
            <ClearIcon />
        </button>
    )
}