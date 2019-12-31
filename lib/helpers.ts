const MS_PER_DAY = 1000 * 60 * 60 * 24
const MS_PER_HOUR = 1000 * 60 * 60

export const addHours = (date: Date, h: number): Date => {
    const ret: Date = new Date(date)
    ret.setTime(date.getTime() + (h * 60 * 60 * 1000))
    return ret
}
export const dateIsEarlierThan = (a: Date, b: Date): boolean => a.valueOf() < b.valueOf()
export const dateIsLaterThan = (a: Date, b: Date): boolean => a.valueOf() > b.valueOf()
export const dateIsWithinAnHour = (a: Date, b: Date): boolean => Math.abs(a.valueOf() - b.valueOf()) < 3600000

export const dateIsBetween = (date: Date, start: Date, end: Date): boolean =>
    start.valueOf() <= date.valueOf() && end.valueOf() >= date.valueOf()

export const getTime = (date: Date): string => date.toISOString().slice(-13, -5)
export const getDateTime = (date: Date): string =>
    date.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', hour: 'numeric'})
