"use strict";
exports.__esModule = true;
var helpers_1 = require("./lib/helpers");
var interfaces_1 = require("./lib/interfaces");
exports.getNodeResultMessage = function (key, params) {
    if (key === 'arriveBetweenFailure' || key === 'arriveBetweenSuccess') {
        return interfaces_1.NodeResultMsg[key].replace('{arrivalTime}', params.arrivalTime ? params.arrivalTime.toString() : '')
            .replace('{deadline}', params.deadline !== undefined ? params.deadline.toString() : '')
            .replace('{deadline2}', params.deadline2 !== undefined ? params.deadline2.toString() : '');
    }
    else if (params.arrivalTime) {
        return interfaces_1.NodeResultMsg[key].replace('{arrivalTime}', params.arrivalTime ? params.arrivalTime.toString() : '')
            .replace('{deadline}', params.deadline ? params.deadline.toString() : '');
    }
    else {
        return interfaces_1.NodeResultMsg[key].replace('{load}', params.load ? params.load.toString() : '')
            .replace('{capacity}', params.capacity ? params.capacity.toString() : '');
    }
};
exports.nodeConditions = function (stops, src, dest, time, load, verbose) {
    if (verbose === void 0) { verbose = false; }
    var res = {
        from: stops[src].id,
        hours: stops[dest].times[src] || 0,
        to: stops[dest].id,
        valid: true
    };
    if (time) {
        if (stops[dest].arriveBy) {
            var hours = stops[dest].times[src] || 0;
            var timeOfArrival = helpers_1.addHours(time, hours);
            var arriveBy = stops[dest].arriveBy || new Date();
            if (!helpers_1.dateIsEarlierThan(timeOfArrival, arriveBy)) {
                if (verbose) {
                    res.arriveBy = exports.getNodeResultMessage('arriveByFailure', {
                        arrivalTime: helpers_1.getDateTime(timeOfArrival),
                        deadline: helpers_1.getDateTime(arriveBy)
                    });
                }
                res.valid = false;
            }
            else if (verbose) {
                if (verbose) {
                    res.arriveBy = exports.getNodeResultMessage('arriveBySuccess', {
                        arrivalTime: helpers_1.getDateTime(timeOfArrival),
                        deadline: helpers_1.getDateTime(arriveBy)
                    });
                }
            }
        }
        else if (stops[dest].arriveAfter) {
            var hours = stops[dest].times[src] || 0;
            var timeOfArrival = helpers_1.addHours(time, hours);
            var arriveAfter = stops[dest].arriveAfter || new Date();
            if (!helpers_1.dateIsLaterThan(timeOfArrival, arriveAfter)) {
                if (verbose) {
                    res.arriveBy = exports.getNodeResultMessage('arriveAfterFailure', {
                        arrivalTime: helpers_1.getDateTime(timeOfArrival),
                        deadline: helpers_1.getDateTime(arriveAfter)
                    });
                }
                res.valid = false;
            }
            else if (verbose) {
                res.arriveBy = exports.getNodeResultMessage('arriveAfterSuccess', {
                    arrivalTime: helpers_1.getDateTime(timeOfArrival),
                    deadline: helpers_1.getDateTime(arriveAfter)
                });
            }
        }
        else if (stops[dest].arriveBetween) {
            var hours = stops[dest].times[src] || 0;
            var timeOfArrival = helpers_1.addHours(time, hours);
            var arriveBetween = stops[dest].arriveBetween || [];
            if (!helpers_1.dateIsBetween(timeOfArrival, arriveBetween[0], arriveBetween[1])) {
                if (verbose) {
                    res.arriveBy = exports.getNodeResultMessage('arriveBetweenFailure', {
                        arrivalTime: helpers_1.getDateTime(timeOfArrival),
                        deadline: helpers_1.getDateTime(arriveBetween[0]),
                        deadline2: helpers_1.getDateTime(arriveBetween[1])
                    });
                }
                res.valid = false;
            }
            else if (verbose) {
                res.arriveBy = exports.getNodeResultMessage('arriveBetweenSuccess', {
                    arrivalTime: helpers_1.getDateTime(timeOfArrival),
                    deadline: helpers_1.getDateTime(arriveBetween[0]),
                    deadline2: helpers_1.getDateTime(arriveBetween[1])
                });
            }
        }
    }
    if (load && stops[dest].load) {
        if (load + stops[dest].load > 100) {
            res.valid = false;
            if (verbose) {
                res.load = exports.getNodeResultMessage('loadCapacityFailure', {
                    capacity: Math.abs(100 - (load + stops[dest].load)),
                    load: load
                });
            }
        }
        else if (load + stops[dest].load <= 0) {
            res.valid = false;
            if (verbose) {
                res.load = exports.getNodeResultMessage('unloadCapacityFailure', {
                    load: load
                });
            }
        }
        else if (verbose) {
            if (stops[dest].load > 0) {
                res.load = exports.getNodeResultMessage('loadCapacitySuccess', {
                    capacity: stops[dest].load,
                    load: load
                });
                res.capacity = load - stops[dest].load;
            }
            else {
                res.load = exports.getNodeResultMessage('unloadCapacitySuccess', {
                    capacity: Math.abs(stops[dest].load),
                    load: load
                });
                res.capacity = load + stops[dest].load;
            }
        }
    }
    return res;
};
var bCost = Infinity;
exports.solve = function (stops, startTime, load, ignore, path, cost) {
    if (path === void 0) { path = [0]; }
    if (stops.length === 1 || path.length > stops.length || (load !== undefined && (load > 100 || load < 0))) {
        return [];
    }
    var res = [];
    var conditions = { valid: true };
    for (var i = 1; i < stops.length; i++) {
        if (path.indexOf(i) > -1) {
            continue;
        }
        if (ignore !== true) {
            conditions = exports.nodeConditions(stops, path[path.length - 1], i, startTime, load);
        }
        if (conditions.valid === true) {
            var nPath = path.slice(0);
            nPath.push(i);
            if (i === stops.length - 1 && path.length !== 1) {
                if ((cost || 0) + stops[i].times[path[path.length - 1]] > bCost) {
                    continue;
                }
                if (nPath.length === stops.length) {
                    bCost = (cost || 0) + stops[i].times[path[path.length - 1]];
                }
                res.push(nPath);
            }
            else if (path[path.length - 1] !== i) {
                if ((cost || 0) + stops[i].times[path[path.length - 1]] > bCost) {
                    continue;
                }
                if (nPath.length === stops.length) {
                    bCost = (cost || 0) + stops[i].times[path[path.length - 1]];
                }
                var paths = exports.solve(stops, startTime !== undefined ?
                    helpers_1.addHours(startTime, stops[i].times[path[path.length - 1]]) : undefined, load !== undefined ?
                    load + (stops[i].load || 0) : undefined, ignore, nPath, (cost || 0) + stops[i].times[path[path.length - 1]]);
                res.push.apply(res, (paths.filter(function (p) { return p.length === stops.length; })));
            }
        }
    }
    if (path.length === 1) {
        return exports.prune(stops, res, startTime, load);
    }
    return res;
};
exports.prune = function (stops, paths, startTime, load) {
    var result = [];
    var bc = Infinity;
    paths.forEach(function (p) {
        var cost = 0;
        for (var i = 1; i < p.length; i++) {
            cost += stops[p[i]].times[p[i - 1]];
            if (cost > bc || cost > bCost) {
                break;
            }
        }
        if (cost < bc && cost <= bCost) {
            bc = cost;
            var rt = startTime;
            var rl = load;
            var details = [];
            for (var i = 1; i < p.length; i++) {
                details.push(exports.nodeConditions(stops, p[i - 1], p[i], rt, rl, true));
                if (rt) {
                    rt = helpers_1.addHours(rt, stops[p[i]].times[p[i - 1]]);
                }
                if (rl) {
                    rl += (stops[p[i]].load || 0);
                }
            }
            result.push({
                cost: cost,
                details: details,
                path: p,
                startTime: startTime
            });
        }
    });
    return result.sort(function (a, b) { return a.cost < b.cost ? -1 : 1; });
};
exports.sortStopsByCriteria = function (stops) {
    var indexMap = {};
    for (var i = 0; i < stops.length; i++) {
        indexMap[stops[i].id] = i;
    }
    var origin = stops.shift();
    var destination = stops.pop();
    var ss = stops.sort(function (a, b) {
        var ac = a.arriveBy ? a.arriveBy : a.arriveBetween
            && a.arriveBetween[1] ? a.arriveBetween[1] : null;
        var bc = b.arriveBy ? b.arriveBy : b.arriveBetween
            && b.arriveBetween[1] ? b.arriveBetween[1] : null;
        return ac ? bc ? ac.valueOf() < bc.valueOf() ? -1 : 1 : -1 : bc ? 1 : 0;
    });
    var times = [];
    ss.forEach(function (stop, index) { return times[index] = stop.times.slice(0); });
    ss.forEach(function (stop, i) {
        if (indexMap[stop.id] - 1 !== i) {
            ss.forEach(function (s, j) {
                times[j][indexMap[stop.id]] = s.times[i + 1];
                times[j][i + 1] = s.times[indexMap[stop.id]];
            });
        }
    });
    ss.forEach(function (stop, index) { return stop.times = times[index]; });
    var result = [origin];
    result.push.apply(result, ss);
    result.push(destination);
    return result;
};
