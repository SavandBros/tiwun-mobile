/**
 * ItemService
 * @namespace tiwun.item.services
 */
(function () {
    'use strict';

    angular.module('tiwun.item.services.ItemService', [])
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
            create: create,
            update: update
        };

        return ItemService;


        /**
         * @name all
         * @desc Get all Items
         * @param {number} page_number
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function all(page_number) {
            return $http.get(
                'https://127.0.0.1:8000/api/index/',
                {params: {page: page_number}}
            );
        }


        /**
         * @name create
         * @desc Create a new Post
         * @param {string} item The content of the new Post
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function create(item) {
            return $http.post('https://127.0.0.1:8000/api/items/', {
                title: item.title,
                description: item.description,
                tags: item.tags
            });
        }

        /**
         * @name Update
         * @desc Update a single item
         * @param {string} item The content of the item to be updated.
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function update(item) {
            return $http.put('https://127.0.0.1:8000/api/items/', {
                title: item.title,
                description: item.description,
                tags: item.tags
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
            return $http.get('https://127.0.0.1:8000/api/items/' + id + '/');
        }

    }
})();
