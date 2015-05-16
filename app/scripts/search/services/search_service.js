/**
 * SearchService
 * @namespace tiwun.sushial.services
 */
(function () {
    'use strict';

    angular.module('tiwun.search.services.SearchService')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http', 'ENV'];

    /**
     *
     * @param $http
     * @returns {{search: tiwun.basement.services.SearchService.search}}
     * @constructor
     */
    function SearchService($http, ENV) {
        var SearchService = {
            search: search
        };

        return SearchService;

        /**
         *
         * @param query
         * @returns {HttpPromise}
         * @memberOf tiwun.basement.services.SearchService
         */
        function search(query) {
            return $http.get(ENV.apiEndpoint + 'search/',
                {params: {q: query.text}}
            );
        }
    }
})();
