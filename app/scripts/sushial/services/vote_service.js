/*global angular*/
'use strict';

/**
 * @class VoteService
 * @param $http
 * @param ENV
 * @namespace tiwun.sushial.services.VoteService
 */
function VoteService($http, ENV) {
    var VoteTypes, ObjectTypes = {};
    VoteTypes = {
        'up': 1,
        'down': 2
    };
    ObjectTypes = {
        'item': 1,
        'comment': 2,
        'tag': 3
    };

    /**
     * Vote up for the given item.
     *
     * @method upVote
     * @param {number} objectType: Object type that is being voted.
     * @param {string} objectId: Object PK!
     * @param {string} userId: User Id that up voting the object.
     * @memberOf tiwun.sushial.services.VoteService
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
     * Down vote for the given item.
     *
     * @method downVote
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

    /**
     * I user liked the object? Who knows!
     *
     * @method isUserLikedObject
     * @param {Number} objectType
     * @param {String} objectId
     * @param {String} userId
     * @returns {Promise}
     * @memberOf tiwun.sushial.services.VoteService
     */
    function isUserLikedObject(objectType, objectId, userId) {
        return $http.get(ENV.apiEndpoint + 'sushial/is-user-liked-object/${objectType}/${objectId}/${userId}/');
    }

    return {
        upVote: upVote,
        downVote: downVote,
        isUserLikedObject: isUserLikedObject,
        VoteTypes: VoteTypes,
        ObjectTypes: ObjectTypes
    };
}

angular.module('tiwun.sushial.services.VoteService', [])
    .factory('VoteService', VoteService);

VoteService.$inject = ['$http', 'ENV'];
