"use strict";
exports.__esModule = true;
exports.stops = [
    {
        id: 'Appleton, WI',
        load: 100,
        startTime: new Date('2019-05-01 5:00'),
        times: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        arriveBetween: [new Date('2019-05-01 6:00'), new Date('2019-05-01 7:00')],
        id: 'Madison, WI',
        load: -10,
        times: [1, 0, 5, 3, 5.5, 7, 7.5, 4, 14, 8.75]
    },
    {
        arriveBy: new Date('2019-05-02 6:00'),
        id: 'Grand Rapids, MI',
        load: 20,
        times: [5.5, 5, 0, 3, 4, 9.5, 6.5, 8.5, 11, 8]
    },
    {
        arriveBetween: [new Date('2019-05-01 8:00'), new Date('2019-05-01 10:00')],
        id: 'Chicago, IL',
        load: -10,
        times: [3.5, 2.5, 3, 0, 3, 7.5, 5.5, 6, 12, 7]
    },
    {
        arriveBy: new Date('2019-05-02 12:00'),
        id: 'Indianapolis, Indiana',
        load: -10,
        times: [6.5, 5.5, 4, 3, 0, 7, 3, 8.5, 11, 4]
    },
    {
        arriveBy: new Date('2019-05-03 12:00'),
        id: 'Kansas City, MO',
        load: -10,
        times: [8.5, 7, 9.5, 7.5, 7, 0, 8.5, 6, 18, 8]
    },
    {
        id: 'Lexington, KY',
        load: -10,
        times: [8.5, 7.5, 6.5, 5.5, 3, 8.5, 0, 11.5, 10.5, 3]
    },
    {
        id: 'Minneapolis, MN',
        load: -10,
        times: [4, 4, 8.5, 6, 8.5, 6, 11.5, 0, 18.5, 12.5]
    },
    {
        id: 'New York, NY',
        load: -10,
        times: [15, 14, 11, 12, 11, 18, 10.5, 18.5, 0, 13.3]
    },
    {
        id: 'Nashville, TN',
        load: -10,
        times: [9.75, 8.75, 8, 7, 4, 8, 3, 12.5, 13.3, 0]
    },
];
