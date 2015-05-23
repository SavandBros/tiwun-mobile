/*global angular*/
'use strict';

/**
 * Item Service
 *
 * @param $http
 * @param gettext
 * @param ENV
 * @class ItemService
 * @namespace tiwun.item.services.ItemService
 */
function ItemService($http, gettext, ENV) {
    var itemQueryFilters = {
        1: gettext('Newest'),
        2: gettext('Comments'),
        3: gettext('Up Votes'),
        4: gettext('Down Votes'),
        5: gettext('Rate')
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
     * create
     *
     * Create a new Post
     *
     * @method create
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
     * update
     *
     * Update a single item
     *
     * @method Update
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
     * get
     *
     * Get item by given ID.
     *
     * @method get
     * @param {Number} id of the Item should be get from API.
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
        itemQueryFilters: itemQueryFilters
    }
}

angular.module('tiwun.item.services.ItemService', [])
    .factory('ItemService', ItemService);

ItemService.$inject = ['$http', 'ENV'];
