/*global angular*/
'use strict';

/**
 * @class VoteService
 * @param $http
 * @param ENV
 * @namespace tiwun.sushial.services.VoteService
 */
function VoteService($http, ENV) {
    var voteTypes, objectTypes = {};
    voteTypes = {
        up: 1,
        down: -1
    };
    objectTypes = {
        item: 1,
        comment: 2,
        tag: 3
    };

    /**
     * Vote up for the given item.
     *
     * @method upVote
     * @param {number} objectType Object type that is being voted.
     * @param {string} objectPk Object PK!
     * @memberOf tiwun.sushial.services.VoteService
     */
    function upVote(objectType, objectPk) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/vote/', {
                object_type: objectType,
                object_pk: objectPk,
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
     * @memberOf tiwun.sushial.services.VoteService
     */
    function downVote(objectType, objectId) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/vote/', {
                object_type: objectType,
                object_pk: objectId,
                vote_type: voteTypes.down
            }
        );
    }

    /**
     * userVotedForObject
     *
     * Is user liked the object? Who knows!
     *
     * @method userVotedForObject
     * @param {Number} objectType
     * @param {String} objectId
     * @returns {Promise}
     * @memberOf tiwun.sushial.services.VoteService
     */
    function userVotedForObject(objectId) {
        return $http.get(
            ENV.apiEndpoint + 'sushial/vote/item/' + objectId + '/'
        );
    }

    return {
        upVote: upVote,
        downVote: downVote,
        userVotedForObject: userVotedForObject,
        voteTypes: voteTypes,
        objectTypes: objectTypes
    };
}

angular.module('tiwun.sushial.services.VoteService', [])
    .factory('VoteService', VoteService);

VoteService.$inject = ['$http', 'ENV'];
