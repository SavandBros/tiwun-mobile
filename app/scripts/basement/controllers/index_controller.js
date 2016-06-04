/*global angular*/
'use strict';

/**
 * Index Controller
 *
 * @param $scope
 * @param $state
 * @param $log
 * @param gettext
 * @param AuthenticationService
 * @param ItemService
 * @param VoteService
 * @class IndexController
 * @namespace tiwun.basement.controllers.IndexController
 */
function IndexController($scope, $state, $log, gettext, AuthenticationService, ItemService, VoteService) {
    $scope.itemKinds = {
        itemKindHottest: {
            text: gettext('Hottest'),
            icon: 'fireball',
            apiPostfix: 'item/items/'
        },
        itemKindNewest: {
            text: gettext('Newest'),
            icon: 'stats-bars',
            apiPostfix: 'item/items/'
        },
        itemKindFree: {
            text: gettext('Free'),
            icon: 'social-usd-outline',
            apiPostfix: 'item/items/'
        }
    };
    $scope.currentItemKind = $scope.itemKinds.itemKindHottest;

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
     * @param {Object} vote
     * @param {Object} item
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    function updateItemVote(vote_type, item) {
        item.userVote = vote_type;
    }

    /**
     * Load More
     *
     * @method loadMore
     * @memberOf tiwun.basement.controllers.IndexController
     */
    $scope.loadMore = function() {
        ItemService.all(++$scope.pageCounter, null, $scope.currentItemKind.apiPostfix).then(
            function(data, status, headers, config) {
                $scope.items = $scope.items.concat(data.data.results);
                $scope.pageHasNext = data.data.page_has_next;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            function(data, status, headers, config) {
                $log.error(data.error);
            }
        );
    };

    /**
     * Check if item has been voted by the current logged in user.
     *
     * If the user is not logged in, then check will be skipped.
     */
    $scope.$on('scroll.infiniteScrollComplete', function() {

        if (AuthenticationService.isAuthenticated()) {

            angular.forEach($scope.items, function(item, v) {

                VoteService.userVotedForObject(item.id).then(

                    function(data, status, headers, config) {

                        updateItemVote(data.data.vote_type, item);
                    },
                    function(data, status, headers, config) {

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
    $scope.upVote = function(item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            return;
        }

        VoteService.upVote(VoteService.objectTypes.item, item.id).then(

            function(data, status, headers, config) {

                var new_vote_type = 0
                if (item.userVote == 1) {
                    new_vote_type = 0;
                } else {
                    new_vote_type = 1;
                }
                updateItemVote(new_vote_type, item);
            },
            function(data, status, headers, config) {

                $log.error('Error on voting item:');
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
    $scope.downVote = function(item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            return;
        }

        VoteService.downVote(VoteService.objectTypes.item, item.id).then(

            function(data, status, headers, config) {

                var new_vote_type = 0
                if (item.userVote == -1) {
                    new_vote_type = 0;
                } else {
                    new_vote_type = -1;
                }
                updateItemVote(new_vote_type, item);
            },
            function(data, status, headers, config) {

                $log.error(data.error);
            }
        )
    };

    /**
     * setItemKind
     * Set Item Kind ;)
     *
     * @method setItemKind
     * @param {String|Object} itemKind
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.setItemKind = function(itemKind) {
        if ($scope.itemKinds[itemKind] === $scope.currentItemKind) {
            return;
        }

        $scope.currentItemKind = $scope.itemKinds[itemKind];
        $scope.pageHasNext = false;
        $scope.items = [];
        $scope.loadMore();
        $scope.pageCounter = 0;
    }
}

angular.module('tiwun.basement.controllers.IndexController', [
        'tiwun.basement.services.ToastService',
        'tiwun.account.services.AuthenticationService',
        'tiwun.item.services.ItemService',
        'tiwun.sushial.services.VoteService'
    ])
    .controller('IndexController', IndexController);

IndexController.$inject = [
    '$scope',
    '$state',
    '$log',
    'gettext',
    'AuthenticationService',
    'ItemService',
    'VoteService'
];
