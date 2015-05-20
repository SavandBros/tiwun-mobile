/*global angular*/
'use strict';

/**
 * Search Service
 *
 * @class SearchService
 * @param $http
 * @param ENV
 * @returns {{search: tiwun.basement.services.SearchService.search}}
 * @namespace tiwun.sushial.services
 */
function SearchService($http, ENV) {

    /**
     * Search the tiwun database for items.
     *
     * @param query Search query object.
     * @param {Number} pageNumber
     * @returns {Promise}
     * @memberOf tiwun.basement.services.SearchService
     */
    function search(query, pageNumber) {
        return $http.get(ENV.apiEndpoint + 'search/', {
            params: {
                q: query.text,
                page: pageNumber
            }
        });
    }

    return {
        search: search
    }
}


angular.module('tiwun.search.services.SearchService')
    .factory('SearchService', SearchService);

SearchService.$inject = ['$http', 'ENV'];
