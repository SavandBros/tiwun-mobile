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
            create: create,
            vote: vote
        };

        var VoteTypes = {
            'up': 0,
            'down': 1
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
            return $http.get('https://127.0.0.1:8000/api/items/' + id + '/');
        }


        /**
         * @name vote
         * @desc Vote up/down for the given item.
         * @param {string} id Item's ID.
         * @param {VoteTypes} voteType: The type of Vote.
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function vote(id, voteType) {
            return $http.post(
                'https://127.0.0.1:8000/api/sushial/like/',
                {item_id: id, vote_type: VoteTypes[voteType]}
            );
        }
    }
})();
