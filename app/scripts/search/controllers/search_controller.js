/*global angular*/
'use strict';

/**
 * Search Controller
 *
 * @class SearchController
 * @param $scope
 * @namespace tiwun.search.controllers.SearchController
 */
function SearchController($scope) {
    $scope.items = [];

    /**
     * @name search
     * @param query Search query
     */
    $scope.search = function (query) {
        // TODO: What happened to search???? WHAAAAAAAAAAAT ?
    }
}

angular.module('tiwun.search.controllers.SearchController', [
    'tiwun.search.services.SearchService'
])
    .controller('SearchController', SearchController);

SearchController.$inject = ['$scope'];
