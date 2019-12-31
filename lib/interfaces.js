"use strict";
exports.__esModule = true;
exports.NodeResultMsg = {
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
};
