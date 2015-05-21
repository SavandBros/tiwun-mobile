/*global angular*/
'use strict';

/**
 * SingleItemController
 *
 * @class SingleItemController
 * @namespace tiwun.item.controllers
 *
 * @param {Object} $scope
 * @param {Object} $stateParams
 * @param {Object} $ionicHistory
 * @param {Object} $state
 * @param {Object} $ionicScrollDelegate
 * @param {Object} $log
 * @param {Object} gettextCatalog
 * @param {ToastService} ToastService
 * @param {ItemService} ItemService
 * @param {CommentService} CommentService
 * @param {VoteService} VoteService
 * @param {AuthenticationService} AuthenticationService
 *
 **/
function SingleItemController($scope, $stateParams, $ionicHistory, $state, $ionicScrollDelegate,
    $log, gettextCatalog, ToastService, ItemService, CommentService, VoteService, AuthenticationService) {
    $scope.auth = AuthenticationService;
    $scope.user = $scope.auth.getAuthenticatedUser();

    /**
     * Actions to be performed when this controller is instantiated.
     *
     * @method constructor
     * @memberOf tiwun.item.controllers.SingleItemController
     **/
    function constructor() {
        ItemService.get($stateParams.itemId).then(
            function(data, status, headers, config) {
                $scope.context = data.data;
                $scope.item = $scope.context.item;

                $scope.$broadcast('itemLoaded');

            },
            function(data, status, headers, config) {
                $log.error('Error on receiving item');
                $log.error(data.error);
                $ionicHistory.goBack();
            }
        );
    }

    constructor();

    /**
     * Update item's vote on the frontend.
     * Based on the vote type from server, the associated vote button will be highlighted.
     *
     * @method updateItemVote
     * @param {Object} data
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    function updateItemVote(data) {
        if (data.vote_type === VoteService.voteTypes.up) {
            $scope.item.userVote = {
                upVote: true
            }
        } else {
            $scope.item.userVote = {
                downVote: true
            };
        }
    }

    /**
     * Retrieving Comments, vote type on `itemLoaded` $broadcast.
     */
    $scope.$on('itemLoaded', function() {
        // Retrieve item's comment.
        CommentService.filterByObject(1, $scope.item.pk).then(
            function(data, status, headers, config) {
                $scope.item.comments = data.data;
            },
            function(data, status, headers, config) {
                $log.error("[error] on getting comments!");
                $log.error(data.error);
            }
        );

        if ($scope.user) {
            // Check if user voted the item.
            VoteService.userVotedForObject(
                VoteService.objectTypes.item,
                $scope.item.pk,
                AuthenticationService.getAuthenticatedUser().pk
            ).then(
                function(data, status, headers, config) {
                    updateItemVote(data.data);
                },
                function(data, status, headers, config) {
                    $log.error(data.data.error);
                }
            );
        }
    });

    /**
     * Add Comment to the item.
     *
     * @method addComment
     * @param {Object} form
     * @param {Object} comment
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.addComment = function(form, comment) {
        if ($scope.auth.isAuthenticated()) {
            console.log(form, comment);
            CommentService.create(1, $scope.item.pk, $scope.user.pk, comment.text).then(
                function(data, status, headers, config) {
                    $scope.item.comments = $scope.item.comments.concat(data.data);
                    comment.text = '';
                    $ionicScrollDelegate.scrollBottom(true);
                    ToastService.show(gettextCatalog.getString('Your comment has been posted successfully.'));

                },
                function(data, status, headers, config) {
                    $log.error('commenting error');
                    $log.error(data.error)
                }
            );
        }
    };

    /**
     * Up vote for the current item in the single item page.
     *
     * @param {Object} item
     * @method upVote
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.upVote = function(item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            return;
        }

        VoteService.upVote(VoteService.objectTypes.item, item.pk, $scope.user.pk).then(
            function(data, status, headers, config) {
                updateItemVote(data.data.vote);
            },
            function(data, status, headers, config) {
                $log.error(data.error);
            }
        )
    };

    /**
     * Down vote for the current item in the single item page.
     * @param {Object} item
     * @method downVote
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.downVote = function(item) {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            return;
        }

        VoteService.downVote(VoteService.objectTypes.item, item.pk, $scope.user.pk).then(
            function(data, status, headers, config) {
                updateItemVote(data.data.vote);
            },
            function(data, status, headers, config) {
                $log.error(data.error);
            }
        )
    };
}


angular.module('tiwun.item.controllers.SingleItemController', [
        'tiwun.basement.services.ToastService',
        'tiwun.item.services.ItemService',
        'tiwun.sushial.services.CommentService',
        'tiwun.account.services.AuthenticationService',
        'tiwun.sushial.services.VoteService'
    ])
    .controller('SingleItemController', SingleItemController);

SingleItemController.$inject = [
    '$scope',
    '$stateParams',
    '$ionicHistory',
    '$state',
    '$ionicScrollDelegate',
    '$log',
    'gettext',
    'ToastService',
    'ItemService',
    'CommentService',
    'VoteService',
    'AuthenticationService'
];
