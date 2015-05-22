'use strict';

describe('tiwun.basement.filters.TimeSinceFilter', function () {
    var filter;

    beforeEach(module('tiwun.basement.filters.TimeSinceFilter', 'gettext'));

    beforeEach(inject(function ($filter) {
        filter = $filter('timesince');
    }));

    it('should return time a year', function () {
        var date = new Date();
        date.setFullYear(date.getFullYear() - 1);

        expect(filter(date)).toEqual('a year');
    });

    it('should return time 2 years', function () {
        var date = new Date();
        date.setFullYear(date.getFullYear() - 2);

        expect(filter(date)).toEqual('2 years');
    });

    it('should return time a month', function () {
        var date = new Date();
        date.setMonth(date.getMonth() - 1);

        expect(filter(date)).toEqual('a month');
    });

    it('should return time 2 months', function () {
        var date = new Date();
        date.setMonth(date.getMonth() - 2);

        expect(filter(date)).toEqual('2 months');
    });

    it('should return time a day', function () {
        var date = new Date();
        date.setDate(date.getDate() - 1);

        expect(filter(date)).toEqual('a day');
    });

    it('should return time 2 days', function () {
        var date = new Date();
        date.setDate(date.getDate() - 2);

        expect(filter(date)).toEqual('2 days');
    });

    it('should return time an hour', function () {
        var currentDate = new Date();
        var date = new Date(currentDate.getTime() - (1000*60*60));

        expect(filter(date)).toEqual('an hour');
    });

    it('should return time 2 hours', function () {
        var currentDate = new Date();
        var date = new Date(currentDate.getTime() - (1000*60*(60*2)));

        expect(filter(date)).toEqual('2 hours');
    });

    it('should return time a minute', function () {
        var currentDate = new Date();
        var date = new Date(currentDate.getTime() - (1000*60));

        expect(filter(date)).toEqual('a minute');
    });

    it('should return time 2 minutes', function () {
        var currentDate = new Date();
        var date = new Date(currentDate.getTime() - (1000*(60*2)));

        expect(filter(date)).toEqual('2 minutes');
    });
});
