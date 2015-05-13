/*global angular*/
'use strict';

/**
 * @class CommentService
 * @returns {Factory}
 * @namespace tiwun.sushial.services.CommentService
 */
function CommentService($http, ENV) {
    var ObjectTypes = {
        'item': 1,
        'comment': 2,
        'tag': 3
    };

    /**
     * @name create: Creating a comment for an object.
     * @param {number} objectType: Object type that is being commented on.
     * @param {string} objectPk:  Object PK!
     * @param {string} userId: User Id that commenting on the the object.
     * @param {string} commentText: Comment text that is being posted on the object.
     * @memberOf tiwun.sushial.services.CommentService
     */
    function create(objectType, objectPk, userId, commentText) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/comment/add/',
            {
                object_type: objectType,
                object_pk: objectPk,
                user_id: userId,
                comment: commentText
            }
        );
    }

    /**
     * @name remove: Remove a comment from an object.
     * @param {number} objectType: Object type that is being commented on.
     * @param {string} objectId:  Object PK!
     * @param {string} userId: User Id that commenting on the the object.
     * @memberOf tiwun.sushial.services.CommentService
     */
    function remove(objectType, objectId, userId) {
        return $http.post(
            ENV.apiEndpoint + 'sushial/comment/remove',
            {
                object_type: objectType,
                object_id: objectId,
                user_id: userId
            }
        );
    }

    /**
     * @name filterByObject: Filter comments by given object.
     * @param {number} objectType: Object type that is being commented on.
     * @param {string} ObjectPk:  Object PK!
     * @memberOf tiwun.sushial.services.CommentService
     */
    function filterByObject(objectType, ObjectPk) {
        return $http.get(
            ENV.apiEndpoint + 'sushial/comment/',
            {
                params: {
                    object_type: objectType,
                    object_pk: ObjectPk
                }
            }
        );
    }

    return {
        create: create,
        remove: remove,
        filterByObject: filterByObject,
        ObjectTypes: ObjectTypes
    };
}

angular.module('tiwun.sushial.services.CommentService', [])
    .factory('CommentService', CommentService);

CommentService.$inject = ['$http', 'ENV'];
