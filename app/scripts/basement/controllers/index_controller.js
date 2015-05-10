/*global angular*/
'use strict';

/**
 * @class IndexController
 * @namespace tiwun.basement.controllers.IndexController
 */
function IndexController($scope, AuthenticationService, ItemService, ToastService) {
    $scope.isAuthenticated = AuthenticationService.isAuthenticated();
    $scope.items = [];
    $scope.pageHasNext = true;
    $scope.pageCounter = 0;


    /**
     * Load More
     *
     * @method loadMore
     * @memberOf tiwun.basement.controllers.IndexController
     */
    $scope.loadMore = function () {
        ItemService.all(++$scope.pageCounter).then(
            function (data, status, headers, config) {
                $scope.items = $scope.items.concat(data.data.classifies);

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

angular.module('tiwun.basement.controllers.IndexController', [
    'tiwun.basement.services.ToastService',
    'tiwun.account.services.AuthenticationService',
    'tiwun.item.services.ItemService'
])
    .controller('IndexController', IndexController);

IndexController.$inject = ['$scope', 'AuthenticationService', 'ItemService', 'ToastService'];
