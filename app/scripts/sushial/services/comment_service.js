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
            filterByItemId: filterByItemId
        };

        var ObjectTypes = {
            'item': 1,
            'comment': 2,
            'tag': 3
        };

        return filterByItemId;
    }
})();
