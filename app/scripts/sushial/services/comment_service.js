/**
 * CommentService
 * @namespace tiwun.sushial.services
 */
(function () {
    'use strict';

    angular.module('tiwun.sushial.services', [])
        .factory('CommentService', CommentService);

    CommentService.$inject = ['$http'];

    /**
     * @namespace CommentService
     * @returns {Factory}
     */
    function CommentService($http) {
        var CommentService = {
            create: create,
            remove: remove,
            filterByObject: filterByObject
        };

        var ObjectTypes = {
            'item': 1,
            'comment': 2,
            'tag': 3
        };

        return filterByItemId;


        /**
         * @name create: Creating a comment for an object.
         * @param {number} objectType: Object type that is being commented on.
         * @param {string} objectId:  Object PK!
         * @param {string} userId: User Id that commenting on the the object.
         * @param {string} commentText: Comment text that is being posted on the object.
         * @memberOf tiwun.sushial.services.CommentService
         */
        function create(objectType, objectId, userId, commentText) {
            $http.post(
                'https://127.0.0.1:8000/api/sushial/comment/create',
                {
                    object_type: objectType,
                    object_id: objectId,
                    user_id: userId,
                    comment_text: commentText
                }
            )
        }
    }
})();
