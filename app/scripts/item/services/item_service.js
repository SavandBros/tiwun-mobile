/**
 * ItemService
 * @namespace tiwun.item.services
 */
(function() {
    'use strict';

    angular.module('tiwun.item.services.ItemService', [])
        .factory('ItemService', ItemService);

    ItemService.$inject = ['$http', 'ENV'];

    /**
     * @namespace ItemService
     * @returns {Factory}
     */
    function ItemService($http, ENV) {
        var ItemQueryFilters = {
            1: 'Newest',
            2: 'Comments',
            3: 'Up Votes',
            4: 'Down Votes',
            5: 'Rate'
        };

        /**
         * @name all
         * @desc Get all Items
         * @param {Number} pageNumber
         * @param {Number} queryFilter
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function all(pageNumber, queryFilter) {
            return $http.get(
                ENV.apiEndpoint + 'index/', {
                    params: {
                        page: pageNumber,
                        filter: queryFilter
                    }
                }
            );
        }


        /**
         * @name create
         * @desc Create a new Post
         * @param {{}} item The content of the new Post
         * @returns {Promise}
         * @memberOf tiwun.item.services.ItemService
         */
        function create(item) {
            return $http.post(ENV.apiEndpoint + 'items/', {
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
            return $http.put(ENV.apiEndpoint + 'items/', {
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
            return $http.get(ENV.apiEndpoint + 'items/' + id + '/');
        }

        return  {
            all: all,
            get: get,
            create: create,
            update: update,
            ItemQueryFilters: ItemQueryFilters
        }
    }
})();
