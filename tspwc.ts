import { addHours, dateIsBetween, dateIsEarlierThan, dateIsLaterThan, getDateTime } from './lib/helpers'
import { INodeResult, INodeResultMsgParams, ITspResult, ITspStop, NodeResultMsg, TNodeResultKey, TspResult } from './lib/interfaces'

export const getNodeResultMessage = (key: TNodeResultKey, params: INodeResultMsgParams): string => {
    if (key === 'arriveBetweenFailure' || key === 'arriveBetweenSuccess') {
        return NodeResultMsg[key].replace('{arrivalTime}', params.arrivalTime ? params.arrivalTime.toString() : '')
                .replace('{deadline}', params.deadline !== undefined ? params.deadline.toString() : '')
                .replace('{deadline2}', params.deadline2 !== undefined ? params.deadline2.toString() : '')
    } else if (params.arrivalTime) {
        return NodeResultMsg[key].replace('{arrivalTime}', params.arrivalTime ? params.arrivalTime.toString() : '')
            .replace('{deadline}', params.deadline ? params.deadline.toString() : '')
    } else {
        return NodeResultMsg[key].replace('{load}', params.load ? params.load.toString() : '')
            .replace('{capacity}', params.capacity ? params.capacity.toString() : '')
    }
}

export const nodeConditions = (stops: any, src: number, dest: number, time?: Date, load?: number,
                               verbose: boolean = false): INodeResult => {
    const res: INodeResult = {
        from: stops[src].id,
        hours: stops[dest].times[src] || 0,
        to: stops[dest].id,
        valid: true,
    }

    if (time) {
        if (stops[dest].arriveBy) {
            const hours: number = stops[dest].times[src] || 0
            const timeOfArrival: Date = addHours(time, hours)
            const arriveBy: Date = stops[dest].arriveBy || new Date()
            if (!dateIsEarlierThan(timeOfArrival, arriveBy)) {
                if (verbose) {
                    res.arriveBy = getNodeResultMessage('arriveByFailure', {
                        arrivalTime: getDateTime(timeOfArrival),
                        deadline: getDateTime(arriveBy),
                    })
                }
                res.valid = false
            } else if (verbose) {
                if (verbose) {
                    res.arriveBy = getNodeResultMessage('arriveBySuccess', {
                        arrivalTime: getDateTime(timeOfArrival),
                        deadline: getDateTime(arriveBy),
                    })
                }
            }
        } else if (stops[dest].arriveAfter) {
            const hours: number = stops[dest].times[src] || 0
            const timeOfArrival: Date = addHours(time, hours)
            const arriveAfter: Date = stops[dest].arriveAfter || new Date()
            if (!dateIsLaterThan(timeOfArrival, arriveAfter)) {
                if (verbose) {
                    res.arriveBy = getNodeResultMessage('arriveAfterFailure', {
                        arrivalTime: getDateTime(timeOfArrival),
                        deadline: getDateTime(arriveAfter),
                    })
                }
                res.valid = false
            } else if (verbose) {
                res.arriveBy = getNodeResultMessage('arriveAfterSuccess', {
                    arrivalTime: getDateTime(timeOfArrival),
                    deadline: getDateTime(arriveAfter),
                })
            }
        } else if (stops[dest].arriveBetween) {
            const hours: number = stops[dest].times[src] || 0
            const timeOfArrival: Date = addHours(time, hours)
            const arriveBetween: Date[] = stops[dest].arriveBetween || []
            if (!dateIsBetween(timeOfArrival, arriveBetween[0], arriveBetween[1])) {
                if (verbose) {
                    res.arriveBy = getNodeResultMessage('arriveBetweenFailure', {
                        arrivalTime: getDateTime(timeOfArrival),
                        deadline: getDateTime(arriveBetween[0]),
                        deadline2: getDateTime(arriveBetween[1]),
                    })
                }
                res.valid = false
            } else if (verbose) {
                res.arriveBy = getNodeResultMessage('arriveBetweenSuccess', {
                    arrivalTime: getDateTime(timeOfArrival),
                    deadline: getDateTime(arriveBetween[0]),
                    deadline2: getDateTime(arriveBetween[1]),
                })
            }
        }
    }

    if (load && stops[dest].load) {
        if (load + stops[dest].load > 100) {
            res.valid = false
            if (verbose) {
                res.load = getNodeResultMessage('loadCapacityFailure', {
                    capacity: Math.abs(100 - (load + stops[dest].load)),
                    load,
                })
            }
        } else if (load + stops[dest].load <= 0) {
            res.valid = false
            if (verbose) {
                res.load = getNodeResultMessage('unloadCapacityFailure', {
                    load,
                })
            }
        } else if (verbose) {
            if (stops[dest].load > 0) {
                res.load = getNodeResultMessage('loadCapacitySuccess', {
                    capacity: stops[dest].load,
                    load,
                })
                res.capacity = load - stops[dest].load
            } else {
                res.load = getNodeResultMessage('unloadCapacitySuccess', {
                    capacity: Math.abs(stops[dest].load),
                    load,
                })
                res.capacity = load + stops[dest].load
            }
        }
    }

    return res
}

let bCost: number = Infinity

export const solve = (stops: ITspStop[], startTime?: Date, load?: number, ignore?: boolean,
                      path: number[] = [0], cost?: number): TspResult => {
    if (stops.length === 1 || path.length > stops.length || (load !== undefined && (load > 100 || load < 0 ))) {
        return []
    }
    let res: number[][] = []
    let conditions: INodeResult | any = { valid: true }
    for (let i: number = 1; i < stops.length; i++) {
        if (path.indexOf(i) > -1) { continue }
        if (ignore !== true) { conditions = nodeConditions(stops, path[path.length - 1], i, startTime, load) }

        if (conditions.valid === true) {
            const nPath: number[] = path.slice(0)
            nPath.push(i)
            if (i === stops.length - 1 && path.length !== 1) {
                if ((cost || 0) + stops[i].times[path[path.length - 1]] > bCost) { continue }
                if (nPath.length === stops.length) { bCost = (cost || 0) + stops[i].times[path[path.length - 1]] }
                res.push(nPath)
            } else if (path[path.length - 1] !== i) {
                if ((cost || 0) + stops[i].times[path[path.length - 1]] > bCost) { continue }
                if (nPath.length === stops.length) { bCost = (cost || 0) + stops[i].times[path[path.length - 1]] }
                const paths = solve(stops,
                                    startTime !== undefined ?
                                    addHours(startTime, stops[i].times[path[path.length - 1]]) : undefined,
                                    load !== undefined ?
                                    load + (stops[i].load || 0) : undefined,
                                    ignore,
                                    nPath,
                                    (cost || 0) + stops[i].times[path[path.length - 1]])
                res.push(...((paths as any).filter((p: number[]) => p.length === stops.length)))
            }
        }
    }
    if (path.length === 1) { return prune(stops, res, startTime, load) }
    return res
}

export const prune = (stops: ITspStop[], paths: number[][], startTime?: Date, load?: number): ITspResult[] => {
    const result: ITspResult[] = []
    let bc: number = Infinity
    paths.forEach ((p: number[]) => {
        let cost: number = 0
        for (let i = 1; i < p.length; i++) {
            cost += stops[p[i]].times[p[i - 1]]
            if (cost > bc || cost > bCost) { break }
        }
        if (cost < bc && cost <= bCost) {
            bc = cost
            let rt: Date | undefined = startTime
            let rl: number | undefined = load
            const details: INodeResult[] = []
            for (let i = 1; i < p.length; i++) {
                details.push(nodeConditions(stops, p[i - 1], p[i], rt, rl, true))
                if (rt) { rt = addHours(rt, stops[p[i]].times[p[i - 1]]) }
                if (rl) { rl += (stops[p[i]].load || 0) }
            }
            result.push({
                cost,
                details,
                path: p,
                startTime,
            })
        }
    })
    return result.sort((a: any, b: any) => a.cost < b.cost ? -1 : 1)
}

export const sortStopsByCriteria = (stops: ITspStop[]): ITspStop[] => {
    const indexMap: any = {}
    for (let i = 0; i < stops.length; i++) { indexMap[stops[i].id] = i}
    const origin: ITspStop | undefined = stops.shift()
    const destination: ITspStop | undefined = stops.pop()
    const ss = stops.sort((a: ITspStop, b: ITspStop) => {
        const ac: Date | null = a.arriveBy ? a.arriveBy : a.arriveBetween
                                && a.arriveBetween[1] ? a.arriveBetween[1] : null
        const bc: Date | null = b.arriveBy ? b.arriveBy : b.arriveBetween
                                && b.arriveBetween[1] ? b.arriveBetween[1] : null
        return ac ? bc ? ac.valueOf() < bc.valueOf() ? -1 : 1 : -1 : bc ? 1 : 0
    })
    const times: number[][] = []
    ss.forEach((stop: any, index: number) => times[index] = stop.times.slice(0))
    ss.forEach((stop: any, i: number) => {
        if (indexMap[stop.id] - 1 !== i) {
            ss.forEach((s: any, j: number) => {
                times[j][indexMap[stop.id]] = s.times[i + 1]
                times[j][i + 1] = s.times[indexMap[stop.id]]
            })
        }
    })
    ss.forEach((stop: any, index: number) => stop.times = times[index])
    const result: ITspStop[] = [(origin as ITspStop)]
    result.push(...ss)
    result.push((destination as ITspStop))
    return result
}
