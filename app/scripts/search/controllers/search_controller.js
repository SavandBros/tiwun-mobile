/**
 * SearchController
 * @namespace tiwun.search.controllers
 */
(function () {
    "use strict";


    angular.module('tiwun.search.controllers.SearchController', [
        'tiwun.search.services.SearchService'
    ])
        .controller('SearchController', SearchController);

    /**
     * @name SearchController
     * @desc Injecting $scope into.
     * @type {string[]}
     */
    SearchController.$inject = ['$scope'];

    /**
     * @name SearchController
     * @param $scope
     * @memberOf tiwun.search.controllers.SearchController
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
})();
