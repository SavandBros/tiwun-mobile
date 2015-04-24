/**
 * VoteService
 * @namespace tiwun.sushial.services
 */
(function () {
    'use strict';

    angular.module('tiwun.sushial.services', [])
        .factory('VoteService', VoteService);

    VoteService.$inject = ['$http'];

    /**
     * @namespace VoteService
     * @returns {Factory}
     */
    function VoteService($http) {
        var VoteService = {
            voteForObject: voteForObject
        };

        var VoteTypes = {
            'up': 0,
            'down': 1
        };

        var ObjectTypes = {
            'item': 0,
            'comment': 1,
            'tag': 2
        };
    }
})();
