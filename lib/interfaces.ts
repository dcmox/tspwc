export interface INodeResult {
    valid: boolean,
    hours: number,
    from: any,
    to: any,
    arriveBy?: string,
    arriveBetween?: string,
    arriveAfter?: string,
    load?: string,
    capacity?: number | undefined,
}

export interface ITspStop {
    id: string,
    arriveBetween?: Date[],
    arriveAfter?: Date,
    arriveBy?: Date,
    load?: number,
    times: number[],
    startTime?: Date
}

export interface ITspResult {
    startTime: Date | undefined,
    path: number[],
    cost: number,
    details: any
}

export interface INodeResultMsg {
    arriveByFailure: string,
    arriveAfterFailure: string,
    arriveBetweenFailure: string,
    arriveBySuccess: string,
    arriveAfterSuccess: string,
    arriveBetweenSuccess: string,
    loadCapacityFailure: string,
    unloadCapacityFailure: string,
    loadCapacitySuccess: string,
    unloadCapacitySuccess: string
}

export interface INodeResultMsgParams {
    arrivalTime?: Date | string,
    deadline?: Date | string,
    deadline2?: Date | string
    load?: number,
    capacity?: number,
}

export const NodeResultMsg: INodeResultMsg = {
    arriveAfterFailure: 'Arrival @ {arrivalTime} is earlier than requested time: {deadline}',
    arriveAfterSuccess: 'Arrival @ {arrivalTime} meets criteria: after {deadline}',
    arriveBetweenFailure: 'Arrival @ {arrivalTime} is not between {deadline} and {deadline2}',
    arriveBetweenSuccess: 'Arrival @ {arrivalTime} meets criteria: between {deadline} and {deadline2}',
    arriveByFailure: 'Arrival @ {arrivalTime} is later than {deadline}',
    arriveBySuccess: 'Arrival @ {arrivalTime} meets criteria: by {deadline}',
    loadCapacityFailure: 'Stock ({load}) exceeds limit by: {capacity}',
    loadCapacitySuccess: 'Added ({capacity}) goods to Salesman ({load}).',
    unloadCapacityFailure: 'Salesman has nothing to sell!',
    unloadCapacitySuccess: 'Sold ({capacity}) goods from Salesman ({load}).'
}

export type TNodeResultKey = 'arriveByFailure' | 'arriveAfterFailure' | 'arriveBetweenFailure'
                    | 'arriveBySuccess' | 'arriveAfterSuccess' | 'arriveBetweenSuccess'
                    | 'loadCapacityFailure' | 'unloadCapacityFailure' | 'loadCapacitySuccess'
                    | 'unloadCapacitySuccess'

export type TspResult = number[][] | ITspResult[]
