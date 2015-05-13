/*global angular*/
'use strict';

/**
 * @class VoteService
 * @param $http
 * @param ENV
 * @namespace tiwun.sushial.services.VoteService
 */
function VoteService($http, ENV) {
    var voteTypes, objectTypes, voteUtils = {};
    voteTypes = {
        'up': 1,
        'down': 2
    };
    objectTypes = {
        item: 1,
        comment: 2,
        tag: 3
    };
    voteUtils = {
        userVotedForObject: 1
    };

    /**
     * Vote up for the given item.
     *
     * @method upVote
     * @param {number} objectType Object type that is being voted.
     * @param {string} objectPk Object PK!
     * @param {string} userId User Id that up voting the object.
     * @memberOf tiwun.sushial.services.VoteService
     */
    function upVote(objectType, objectPk, userId) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/vote/',
            {
                object_type: objectType,
                object_pk: objectPk,
                user_id: userId,
                vote_type: voteTypes.up
            }
        );
    }

    /**
     * Down vote for the given item.
     *
     * @method downVote
     * @param {number} objectType Object type that is being voted.
     * @param {string} objectId Object PK!
     * @param {string} userId User Id that down voting the object.
     * @memberOf tiwun.sushial.services.VoteService
     */
    function downVote(objectType, objectId, userId) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/vote/',
            {
                object_type: objectType,
                object_id: objectId,
                user_id: userId,
                vote_type: voteTypes.down
            }
        );
    }

    /**
     * Is user liked the object? Who knows!
     *
     * @method userVotedForObject
     * @param {Number} objectType
     * @param {String} objectId
     * @param {String} userId
     * @returns {Promise}
     * @memberOf tiwun.sushial.services.VoteService
     */
    function userVotedForObject(objectType, objectId, userId) {
        return $http.get(
            ENV.apiEndpoint + 'sushial/vote/utils/',
            {
                params: {
                    utils_type: voteUtils.userVotedForObject,
                    object_type: objectType,
                    object_pk: objectId,
                    user_id: userId
                }
            }
        );
    }

    return {
        upVote: upVote,
        downVote: downVote,
        userVotedForObject: userVotedForObject,
        voteTypes: voteTypes,
        objectTypes: objectTypes,
        voteUtils: voteUtils
    };
}

angular.module('tiwun.sushial.services.VoteService', [])
    .factory('VoteService', VoteService);

VoteService.$inject = ['$http', 'ENV'];
