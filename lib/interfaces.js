"use strict";
exports.__esModule = true;
exports.NodeResultMsg = {
    arriveAfterFailure: 'Arrival @ {arrivalTime} is earlier than requested time: {deadline}',
    arriveAfterSuccess: 'Arrival @ {arrivalTime} meets criteria: after {deadline}',
    arriveBetweenFailure: 'Arrival @ {arrivalTime} is not between {deadline} and {deadline2}',
    arriveBetweenSuccess: 'Arrival @ {arrivalTime} meets criteria: between {deadline} and {deadline2}',
    arriveByFailure: 'Arrival @ {arrivalTime} is later than {deadline}',
    arriveBySuccess: 'Arrival @ {arrivalTime} meets criteria: by {deadline}',
    loadCapacityFailure: 'Load capacity ({load}) exceeds limit by: {capacity}',
    loadCapacitySuccess: 'Loaded ({capacity}) to Truck ({load}).',
    unloadCapacityFailure: 'Truck has no remaining payload!',
    unloadCapacitySuccess: 'Unloaded ({capacity}) from Truck ({load}).'
};
