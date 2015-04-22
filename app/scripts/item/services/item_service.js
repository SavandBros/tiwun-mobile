/**
 * ItemService
 * @namespace tiwun.item.services
 */
(function () {
    'use strict';

    angular.module('tiwun.item.services', [])
        .factory('ItemService', ItemService);

    ItemService.$inject = ['$http'];

    /**
     * @namespace ItemService
     * @returns {Factory}
     */
    function ItemService($http) {
        var ItemService = {
            all: all,
            get: get,
            create: create
        };

        return ItemService;


        /**
         * @name all
         * @desc Get all ItemService
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function all() {
            return $http.get('https://127.0.0.1:8000/api/index/');
        }


        /**
         * @name create
         * @desc Create a new Post
         * @param {string} content The content of the new Post
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function create(content) {
            return $http.post('/api/v1/items/', {
                content: content
            });
        }


        /**
         * @name get
         * @desc Get the ItemService of a given user
         * @param {string} username The username to get ItemService for
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function get(id) {
            return $http.get('/api/v1/users/' + id + '/items/');
        }
    }
})();
