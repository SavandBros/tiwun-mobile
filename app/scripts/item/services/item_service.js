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
     * Items
     *
     * Retrieve items in list
     *
     * @method items
     * @param {Number} pageNumber
     * @param {Object} params
     * @returns {Promise}
     * @memberOf tiwun.item.services.ItemService
     */
    function items(pageNumber, params) {
        params = params || {};
        params.type = ENV.resourceType.list;

        return $http.get(ENV.apiEndpoint + 'items/', {
            params: params
        });
    }

    /**
     * @name all
     * @desc Get all Items
     * @param {Number} pageNumber
     * @param {Number} queryFilter
     * @param {String} itemKind
     * @param {String} userId
     * @param {Object} params
     * @returns {Promise}
     * @memberOf tiwun.item.services.ItemService
     */
    function all(pageNumber, queryFilter, itemKind, userId, params) {
        itemKind = itemKind || '';
        params = params || {};

        if (queryFilter) params.filter = queryFilter;
        if (pageNumber) params.page = pageNumber;
        if (userId) params.user_d = userId;

        return $http.get(ENV.apiEndpoint + itemKind, {
            params: params
        });
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
        return $http.get(ENV.apiEndpoint + 'items/', {
            params: {
                id: id
            }
        });
    }

    return {
        items: items,
        all: all,
        get: get,
        create: create,
        update: update,
        itemQueryFilters: itemQueryFilters
    }
}

angular.module('tiwun.item.services.ItemService', [])
    .factory('ItemService', ItemService);

ItemService.$inject = ['$http', 'gettext', 'ENV'];
