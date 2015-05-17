/*global angular*/
'use strict';

/**
 * @class IndexController
 * @namespace tiwun.basement.controllers.IndexController
 */
function IndexController($scope, $state, $log, ToastService, AuthenticationService, ItemService, VoteService) {
    $scope.isAuthenticated = AuthenticationService.isAuthenticated();
    $scope.items = [];
    $scope.pageHasNext = true;
    $scope.pageCounter = 0;
    $scope.user = AuthenticationService.getAuthenticatedUser();

    /**
     * Update item's vote on the frontend.
     * Based on the vote type from server, the associated vote button will be highlighted.
     *
     * @method updateItemVote
     * @param {Object} data
     * @param {Object} item
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    function updateItemVote (data, item) {
        if (data.vote_type === VoteService.voteTypes.up) {
            item.userVote = {upVote: true}
        } else {
            item.userVote = {downVote: true};
        }
    }

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
                $log.error(data.error);
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
                        updateItemVote(data.data, item);
                    },
                    function (data, status, headers, config) {
                        $log.error(data.data.error);
                    }
                );
            });
        }
    });

    /**
     * Up vote for the current item in the single item page.
     *
     * @method upVote
     * @param {Object} item
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.upVote = function (item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            return;
        }

        VoteService.upVote(VoteService.objectTypes.item, item.pk, $scope.user.pk).then(
            function (data, status, headers, config) {
                updateItemVote(data.data.vote, item);
            },
            function (data, status, headers, config) {
                $log.error(data.error);
            }
        )
    };

    /**
     * Down vote for the current item in the single item page.
     *
     * @method downVote
     * @param {Object} item
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.downVote = function (item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            return;
        }

        VoteService.downVote(VoteService.objectTypes.item, item.pk, $scope.user.pk).then(
            function (data, status, headers, config) {
                updateItemVote(data.data.vote, item);
            },
            function (data, status, headers, config) {
                $log.error(data.error);
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

IndexController.$inject = ['$scope', '$state', '$log', 'ToastService', 'AuthenticationService', 'ItemService', 'VoteService'];
