/**
 * SearchController
 * @namespace tiwun.search.controllers
 */
(function () {
    "use strict";


    angular.module('tiwun.search.controllers', [
        'tiwun.search.services'
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
            console.log(query.text);
        }
    }
})();
