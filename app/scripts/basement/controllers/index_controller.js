/**
 * @class IndexController
 * @namespace tiwun.basement.controllers
 */
(function () {
    "use strict";

    angular.module('tiwun.basement.controllers.IndexController', [
        'tiwun.account.services.AuthenticationService',
        'tiwun.item.services.ItemService'
    ])
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'AuthenticationService', 'ItemService'];

    /**
     * @namespace IndexController
     */
    function IndexController($scope, AuthenticationService, ItemService) {
        $scope.isAuthenticated = AuthenticationService.isAuthenticated();
        $scope.items = [];
        $scope.pageHasNext = true;
        $scope.pageCounter = 0;


        /**
         * @name loadMore
         */
        $scope.loadMore = function () {
            ItemService.all(++$scope.pageCounter).then(
                function (data, status, headers, config) {
                    $scope.items = $scope.items.concat(data.data['classifies']);

                    $scope.pageHasNext = data.data.page_has_next;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function (data, status, headers, config) {
                    //Snackbar.error(data.error);
                    console.log(data.error);
                }
            );
        };
    }
})();
