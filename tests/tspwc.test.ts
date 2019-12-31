import assert from 'assert'
import { TspResult } from '../lib/interfaces'
import * as testSuite from '../tspwc'
import * as testData from './test-data'

describe('tsptw test suite', () => {
    describe('solve(stops, initialTime, initialLoad, ignoreConditions, initialPath)', () => {
        it('should return true if date is earlier than', () => {
            const initialTime: Date = testData.stops[0].startTime || new Date()
            const actual: TspResult = testSuite.solve(testData.stops, initialTime, 100)
            // tslint:disable: object-literal-sort-keys
            assert.deepEqual(actual, [
                {
                  cost: 52.5,
                  details: [
                    {
                      from: 'Appleton, WI',
                      hours: 1,
                      to: 'Madison, WI',
                      valid: true,
                      arriveBy: 'Arrival @ 5/1, 6 AM meets criteria: between 5/1, 6 AM and 5/1, 7 AM',
                      load: 'Sold (10) goods from Salesman (100).',
                      capacity: 90,
                    },
                    {
                      from: 'Madison, WI',
                      hours: 2.5,
                      to: 'Chicago, IL',
                      valid: true,
                      arriveBy: 'Arrival @ 5/1, 8 AM meets criteria: between 5/1, 8 AM and 5/1, 10 AM',
                      load: 'Sold (10) goods from Salesman (90).',
                      capacity: 80,
                    },
                    {
                      from: 'Chicago, IL',
                      hours: 3,
                      to: 'Grand Rapids, MI',
                      valid: true,
                      arriveBy: 'Arrival @ 5/1, 11 AM meets criteria: by 5/2, 6 AM',
                      load: 'Added (20) goods to Salesman (80).',
                      capacity: 60,
                    },
                    {
                      from: 'Grand Rapids, MI',
                      hours: 8.5,
                      to: 'Minneapolis, MN',
                      valid: true,
                      load: 'Sold (10) goods from Salesman (100).',
                      capacity: 90,
                    },
                    {
                      from: 'Minneapolis, MN',
                      hours: 6,
                      to: 'Kansas City, MO',
                      valid: true,
                      arriveBy: 'Arrival @ 5/2, 2 AM meets criteria: by 5/3, 12 PM',
                      load: 'Sold (10) goods from Salesman (90).',
                      capacity: 80,
                    },
                    {
                      from: 'Kansas City, MO',
                      hours: 7,
                      to: 'Indianapolis, Indiana',
                      valid: true,
                      arriveBy: 'Arrival @ 5/2, 9 AM meets criteria: by 5/2, 12 PM',
                      load: 'Sold (10) goods from Salesman (80).',
                      capacity: 70,
                    },
                    {
                      from: 'Indianapolis, Indiana',
                      hours: 11,
                      to: 'New York, NY',
                      valid: true,
                      load: 'Sold (10) goods from Salesman (70).',
                      capacity: 60,
                    },
                    {
                      from: 'New York, NY',
                      hours: 10.5,
                      to: 'Lexington, KY',
                      valid: true,
                      load: 'Sold (10) goods from Salesman (60).',
                      capacity: 50,
                    },
                    {
                      from: 'Lexington, KY',
                      hours: 3,
                      to: 'Nashville, TN',
                      valid: true,
                      load: 'Sold (10) goods from Salesman (50).',
                      capacity: 40,
                    },
                  ],
                  path: [
                    0,
                    1,
                    3,
                    2,
                    7,
                    5,
                    4,
                    8,
                    6,
                    9,
                  ],
                  startTime: new Date('2019-05-01T10:00:00.000Z'),
                },
              ])
        })
    })
})
