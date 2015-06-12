/*global angular*/
'use strict';

/**
 * Search Controller
 *
 * @class SearchController
 * @param $scope
 * @param $log
 * @param $sce
 * @param {SearchService} SearchService
 * @param {TagService} TagService
 * @param {SearchItemFactory} SearchItemFactory
 * @namespace tiwun.search.controllers.SearchController
 */
function SearchController($scope, $log, $sce, SearchService, TagService, SearchItemFactory) {
    var pageHasNext = true;
    var pageNumber = 0;
    var searchQuery = {};
    var keywords = [];
    $scope.tags = [];
    $scope.shouldSpin = false;
    $scope.items = [];
    $scope.IsSearchPage = true;

    function constructor() {
        TagService.all().then(
            function(data, status, headers, config) {
                $scope.tags = data.data.tags;
            },
            function(data, status, headers, config) {
                $log.error(data.error);
            }
        );
    }

    constructor();

    /**
     * highlight
     *
     * Highlight the current text from the searching term
     *
     * @method highlight
     * @param {String} str
     * @param {String} term
     * @returns {XML|*|void|string}
     * @memberOf tiwun.search.controllers.SearchController
     */
    function highlight(str, term) {
        var highlightRegex = new RegExp('(' + term + ')', 'gi');

        return str.replace(highlightRegex, '<strong>$1</strong>')
    }


    /**
     * term
     *
     * Suggest and find search terms for auto complete.
     *
     * @method term
     * @param {String} term
     * @returns {Array}
     * @memberOf tiwun.search.controllers.SearchController
     */
    function suggestKeywords(term) {
        var q = term.toLowerCase().trim();
        var results = [];


        // Find the first 10 cities that start with `term`
        for (var i = 0; i < keywords.length && results.length < 10; i++) {
            var keyword = keywords[i].keyword;

            if (keyword.toLowerCase().indexOf(q) === 0) {
                results.push({
                    label: $sce.trustAsHtml(highlight(keyword, term)),
                    value: keyword
                });
            }
        }

        return results;

    }

    $scope.ac_option_highlight = {
        suggest: suggestKeywords
    };

    /**
     * Search all over the place!
     *
     * @method search
     * @param {Object} form
     * @memberOf tiwun.search.controllers.SearchController
     */
    $scope.search = function(form) {
        pageNumber = 1;
        searchQuery.text = form.query.$modelValue;
        $scope.shouldSpin = true;

        SearchService.search(searchQuery, pageNumber).then(
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

    /**
     * onKeywordChange
     *
     * Get the similar keyword from search history for auto complete.
     *
     * @method onKeywordChange
     * @param {String} keyword
     * @memberOf tiwun.search.controllers.SearchController
     */
    $scope.onKeywordChange = function(keyword) {
        if (keyword && keyword.length < 2) {
            return;
        }

        SearchItemFactory.searchHistoryItems(keyword, 1).success(
            function(data, status, headers, config) {
                keywords = data.keywords;
            }
        )
    }

}

angular.module('tiwun.search.controllers.SearchController', [
    'tiwun.search.services.SearchService',
    'tiwun.tagool.services.TagService',
    'tiwun.analytics.factories.SearchItemFactory'

]).controller('SearchController', SearchController);

SearchController.$inject = ['$scope', '$log', '$sce', 'SearchService', 'TagService', 'SearchItemFactory'];
