/*global angular*/
'use strict';

/**
 * Search Controller
 *
 * @class SearchController
 * @param $scope
 * @param $log
 * @param {SearchService} SearchService
 * @namespace tiwun.search.controllers.SearchController
 */
function SearchController($scope, $log, SearchService) {
    var pageHasNext = true;
    var pageNumber = 0;
    var searchQuery;
    $scope.shouldSpin = false;
    $scope.items = [];

    /**
     * Search all over the place!
     *
     * @method search
     * @param {Object} form
     * @param {Object} query Search query
     * @memberOf tiwun.search.controllers.SearchController
     */
    $scope.search = function(form, query) {
        pageNumber = 1;
        searchQuery = query;
        $scope.shouldSpin = true;

        SearchService.search(query, pageNumber).then(
            function(data, status, headers, config) {
                $scope.items = data.data.classifies;
                $scope.pageHasNext = data.data.page_has_next;
                $scope.shouldSpin = false;
                $scope.noResult = $scope.items.length === 0;
            },
            function(data, status, headers, config) {
                $log.error("Error in search: " + data.data.error);
            }
        );
    };


    /**
     * Load More
     *
     * @method loadMore
     * @memberOf tiwun.search.controllers.SearchController
     */
    $scope.loadMore = function() {
        SearchService.search(searchQuery, ++pageNumber).then(
            function(data, status, headers, config) {
                $scope.items = $scope.items.concat(data.data.classifies);
                $scope.pageHasNext = data.data.page_has_next;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            function(data, status, headers, config) {
                $log.error("Error in search: " + data.data.error);
            }
        );
    };

}

angular.module('tiwun.search.controllers.SearchController', [
        'tiwun.search.services.SearchService'
    ])
    .controller('SearchController', SearchController);

SearchController.$inject = ['$scope', '$log', 'SearchService'];
