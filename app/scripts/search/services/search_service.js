/**
 * SearchService
 * @namespace tiwun.sushial.services
 */
(function () {
    'use strict';

    angular.module('tiwun.search.services')
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http'];

    /**
     *
     * @param $http
     * @returns {{search: tiwun.basement.services.SearchService.search}}
     * @constructor
     */
    function SearchService($http) {
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
            return $http.get('https://127.0.0.1:8000/api/search/',
                {params: {q: query.text}}
            );
        }
    }
})();
