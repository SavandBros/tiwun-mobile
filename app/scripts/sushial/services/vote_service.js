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
            'up': 1,
            'down': 2
        };

        var ObjectTypes = {
            'item': 1,
            'comment': 2,
            'tag': 3
        };

        /**
         * @name upVote
         * @desc Vote up for the given item.
         * @param {string} objectId: Object PK!
         * @param {string} userId: User Id that up voting the object.
         * @memberOf tiwun.sushial.servicesVoteService
         */
        function upVote(objectId, userId) {
            return $http.post(
                'https://127.0.0.1:8000/api/sushial/vote/',
                {object_id: objectId, user_id: userId, vote_type: VoteTypes.up}
            );
        }

        /**
         * @name downVote
         * @desc Down vote for the given item.
         * @param {string} objectId: Object PK!
         * @param {string} userId: User Id that down voting the object.
         * @memberOf tiwun.sushial.services.VoteService
         */
        function downVote(objectId, userId) {
            return $http.post(
                'https://127.0.0.1:8000/api/sushial/vote/',
                {object_id: objectId, user_id: userId, vote_type: VoteTypes.down}
            );
        }
    }
})();
