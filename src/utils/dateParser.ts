export const dateParser = (date: string) => {
    const [ dayName, fullDate ] = new Date(date)
        .toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
        .split(',');

    return [ dayName.charAt(0).toUpperCase() + dayName.slice(1), fullDate ]
}