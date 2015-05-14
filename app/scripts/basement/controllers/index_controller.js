/*global angular*/
'use strict';

/**
 * @class IndexController
 * @namespace tiwun.basement.controllers.IndexController
 */
function IndexController($scope, $state, ToastService, AuthenticationService, ItemService, VoteService) {
    $scope.isAuthenticated = AuthenticationService.isAuthenticated();
    $scope.items = [];
    $scope.pageHasNext = true;
    $scope.pageCounter = 0;
    $scope.user = AuthenticationService.getAuthenticatedUser();


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

    /**
     * Check if item has been liked by the current logged in user.
     *
     * If the user is not logged in, then check will be skipped.
     */
    $scope.$on('scroll.infiniteScrollComplete', function () {
        if ($scope.user) {
            angular.forEach($scope.items.slice($scope.items.length - 5), function (item, v) {
                VoteService.userVotedForObject(
                    VoteService.objectTypes.item,
                    item.pk,
                    AuthenticationService.getAuthenticatedUser().pk
                ).then(
                    function (data, status, headers, config) {
                        item.userVote = data.data;
                    },
                    function (data, status, headers, config) {
                        console.log(data.data.error);
                    }
                );
            });
        }
    });

    /**
     * Up vote for the current item in the single item page.
     *
     * @param {Object} item
     * @method upVote
     * @memberOf tiwun.item.controllers.IndexController
     */
    $scope.upVote = function (item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
        }

        VoteService.upVote(VoteService.objectTypes.item, item.pk, $scope.user.pk).then(
            function (data, status, headers, config) {
                // TODO: Highlight the up vote button.
                console.log(data.data);
            },
            function (data, status, headers, config) {
                // TODO: Show the error message
                console.log(data.error);
            }
        )

    };
}

angular.module('tiwun.basement.controllers.IndexController', [
    'tiwun.basement.services.ToastService',
    'tiwun.account.services.AuthenticationService',
    'tiwun.item.services.ItemService',
    'tiwun.sushial.services.VoteService'
])
    .controller('IndexController', IndexController);

IndexController.$inject = ['$scope', 'ToastService', 'AuthenticationService', 'ItemService', 'VoteService'];
