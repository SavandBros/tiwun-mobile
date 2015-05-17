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
     * @returns {HttpPromise}
     * @memberOf tiwun.basement.services.SearchService
     */
    function search(query) {
        return $http.get(ENV.apiEndpoint + 'search/',
            {params: {q: query.text}}
        );
    }

    return {
        search: search
    }
}


angular.module('tiwun.search.services.SearchService')
    .factory('SearchService', SearchService);

SearchService.$inject = ['$http', 'ENV'];
