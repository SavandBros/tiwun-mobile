/**
 * SearchService
 * @namespace tiwun.sushial.services
 */
(function () {
    'use strict';

    angular.module('tiwun.basement.services', [])
        .factory('SearchService', SearchService);

    SearchService.$inject = ['$http'];

    function SearchService($http) {
        var SearchService = {
            search: search
        };

        return SearchService;
    }
})();
