/*global angular*/
'use strict';


/**
 * Time Since Filter
 *
 * Calculate time since from given date object.
 * 3 days, 1 month, one year...
 *
 * @class TimeSinceFilter
 * @namespace tiwun.basement.filters.TimeSinceFilter
 * @param gettextCatalog
 * @returns {Function}
 */
function TimeSinceFilter(gettextCatalog) {
    return function(date) {
        if (typeof date == 'string') {
            date = new Date(date);
        }
        var seconds = Math.floor((new Date() - date) / 1000);

        var INTERVALS = {
            YEAR: {
                seconds: 31536000,
                tense: gettextCatalog.getString('year'),
                tense_plural: gettextCatalog.getString('years')
            },
            MONTH: {
                seconds: 2592000,
                tense: gettextCatalog.getString('month'),
                tense_plural: gettextCatalog.getString('months')
            },
            DAY: {
                seconds: 86400,
                tense: gettextCatalog.getString('day'),
                tense_plural: gettextCatalog.getString('days')
            },
            HOUR: {
                seconds: 3600,
                tense: gettextCatalog.getString('hour'),
                tense_plural: gettextCatalog.getString('hours')
            },
            MINUTE: {
                seconds: 60,
                tense: gettextCatalog.getString('minute'),
                tense_plural: gettextCatalog.getString('minutes')
            }
        };

        for (var k in INTERVALS) {
            var secondsDifference = Math.floor(seconds / INTERVALS[k].seconds);
            var tense = INTERVALS[k].tense;
            var tensePrefix;

            if (secondsDifference < 1 && secondsDifference > 0) {
                tensePrefix = gettextCatalog.getString('less than a');

                return "tensePrefix TenseType".replace('tensePrefix', tensePrefix)
                    .replace('TenseType', tense);
            } else if (secondsDifference === 1) {
                if (k == 'HOUR') tensePrefix = gettextCatalog.getString('an');
                else tensePrefix = gettextCatalog.getString('a');

                return "tensePrefix tense".replace('tensePrefix', tensePrefix)
                    .replace('tense', tense);
            } else if (secondsDifference > 1) {
                tense = INTERVALS[k].tense_plural;
                tensePrefix = secondsDifference;

                return 'tensePrefix tense'.replace('tensePrefix', tensePrefix)
                    .replace('tense', tense);
            }
        }
    }
}

angular.module('tiwun.basement.filters.TimeSinceFilter', [])
    .filter('timesince',  TimeSinceFilter);

TimeSinceFilter.$inject = ['gettextCatalog'];
