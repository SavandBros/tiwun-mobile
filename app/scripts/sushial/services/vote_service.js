/*global angular*/
'use strict';

/**
 * @class VoteService
 * @param $http
 * @param ENV
 * @namespace tiwun.sushial.services.VoteService
 */
function VoteService($http, ENV) {
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
     * @param {number} objectType: Object type that is being voted.
     * @param {string} objectId: Object PK!
     * @param {string} userId: User Id that up voting the object.
     * @memberOf tiwun.sushial.servicesVoteService
     */
    function upVote(objectType, objectId, userId) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/vote/',
            {
                object_type: objectType,
                object_id: objectId,
                user_id: userId,
                vote_type: VoteTypes.up
            }
        );
    }

    /**
     * @name downVote
     * @desc Down vote for the given item.
     * @param {number} objectType: Object type that is being voted.
     * @param {string} objectId: Object PK!
     * @param {string} userId: User Id that down voting the object.
     * @memberOf tiwun.sushial.services.VoteService
     */
    function downVote(objectType, objectId, userId) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/vote/',
            {
                object_type: objectType,
                object_id: objectId,
                user_id: userId,
                vote_type: VoteTypes.down
            }
        );
    }

    return {
        upVote: upVote,
        downVote: downVote,
        VoteTypes: VoteTypes,
        ObjectTypes: ObjectTypes
    };
}

angular.module('tiwun.sushial.services.VoteService', [])
    .factory('VoteService', VoteService);

VoteService.$inject = ['$http', 'ENV'];
