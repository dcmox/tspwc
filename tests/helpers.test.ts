import assert from 'assert'
import sinon from 'sinon'
import * as testSuite from '../lib/helpers'

describe('helpers test suite', () => {
    describe('dateIsEarlierThan(date, date)', () => {
        it('should return true if date is earlier than', () => {
            const actual: boolean = testSuite.dateIsEarlierThan(new Date('2019-05-05 5:00'),
                                                                new Date('2019-05-05 6:00'))
            assert.deepEqual(actual, true)
        })

        it('should return false if date is equal or later than', () => {
            let actual: boolean = testSuite.dateIsEarlierThan(new Date('2019-05-05 7:00'), new Date('2019-05-05 6:00'))
            assert.deepEqual(actual, false)

            actual = testSuite.dateIsEarlierThan(new Date('2019-05-05 7:00'), new Date('2019-05-05 7:00'))
            assert.deepEqual(actual, false)
        })
    })

    describe('dateIsLaterThan(date, date)', () => {
        it('should return true if date is later than', () => {
            const actual: boolean = testSuite.dateIsLaterThan(new Date('2019-05-05 8:00'),
                                                              new Date('2019-05-05 5:00'))
            assert.deepEqual(actual, true)
        })

        it('should return false if date is equal or earlier than', () => {
            let actual: boolean = testSuite.dateIsLaterThan(new Date('2019-05-05 7:00'), new Date('2019-05-05 8:00'))
            assert.deepEqual(actual, false)

            actual = testSuite.dateIsLaterThan(new Date('2019-05-05 7:00'), new Date('2019-05-05 7:00'))
            assert.deepEqual(actual, false)
        })
    })

    describe('dateIsBetween(date, startDate, endDate)', () => {
        it('should return true if date is between', () => {
            const actual: boolean = testSuite.dateIsBetween(new Date('2019-05-05 8:00'),
                                                            new Date('2019-05-05 5:00'),
                                                            new Date('2019-05-05 9:00'))
            assert.deepEqual(actual, true)
        })

        it('should return false if date is not between', () => {
            let actual: boolean = testSuite.dateIsBetween(new Date('2019-05-05 8:00'),
                                                            new Date('2019-05-05 5:00'),
                                                            new Date('2019-05-05 7:59'))
            assert.deepEqual(actual, false)

            actual = testSuite.dateIsBetween(new Date('2019-05-05 8:00'),
                                                new Date('2019-05-05 8:01'),
                                                new Date('2019-05-05 9:00'))
            assert.deepEqual(actual, false)
        })
    })

    describe('getTime(date)', () => {
        it('should return the correctly formatted time', () => {
            const actual: string = testSuite.getTime(new Date('2019-05-05 8:00'))
            assert.deepEqual(actual, '13:00:00')
        })
    })

    describe('getDateTime(date)', () => {
        it('should return the correctly formatted date', () => {
            const actual: string = testSuite.getDateTime(new Date('2019-05-05 8:00'))
            assert.deepEqual(actual, '5/5, 8 AM')
        })
    })

    describe('addHours(date, hours)', () => {
        it('should add hours to a date', () => {
            const actual: Date = testSuite.addHours(new Date('2019-05-05 8:00'), 5)
            assert.deepEqual(actual, new Date('2019-05-05 13:00'))
        })
    })
})
