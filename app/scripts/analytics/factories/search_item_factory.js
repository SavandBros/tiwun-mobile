/*global angular*/
'use strict';

/**
 * Search Item Factory
 *
 * @class SearchItemFactory
 * @param $http
 * @param ENV
 * @namespace tiwun.analytics.factories.SearchItemFactory
 */
function SearchItemFactory($http, ENV) {

    /**
     * Search the tiwun database for items.
     *
     * @method searchHistoryItems
     * @param {String} keyword Search query object.
     * @param {Number} pageNumber
     * @returns {Promise}
     * @memberOf tiwun.analytics.factories.SearchItemFactory
     */
    function searchHistoryItems(keyword, pageNumber) {
        return $http.get(ENV.apiEndpoint + 'analytics/search-history-items/', {
            params: {
                keyword__icontains: keyword,
                page: pageNumber,
                resource_type: ENV.resourceType.list
            }
        });
    }

    // TODO: Add user search history items

    return {
        searchHistoryItems: searchHistoryItems
    }
}


angular.module('tiwun.analytics.factories.SearchItemFactory')
    .factory('SearchItemFactory', SearchItemFactory);

SearchItemFactory.$inject = ['$http', 'ENV'];
