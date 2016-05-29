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
 * @param {Object} $ionicSlideBoxDelegate
 * @param {Object} gettextCatalog
 * @param {ToastService} ToastService
 * @param {tiwun.item.services.ItemService} ItemService
 * @param {CommentService} CommentService
 * @param {VoteService} VoteService
 * @param {AuthenticationService} AuthenticationService
 *
 **/
function SingleItemController($scope, $stateParams, $ionicHistory, $state, $ionicScrollDelegate,
    $log, $ionicSlideBoxDelegate, gettextCatalog, ToastService, ItemService, CommentService, VoteService, AuthenticationService) {
    $scope.auth = AuthenticationService;
    $scope.user = $scope.auth.getAuthenticatedUser();

    $scope.isEditing = false;

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
                $scope.item = $scope.context;
                $scope.item.description = $scope.item.description.replace(/\n/g, "<br />");
                $scope.item.userVote = {
                    upVote: false,
                    downVote: false
                };
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
     * @param {Object} votes
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    function updateItemVote(votes) {
        if (votes.vote_type === VoteService.voteTypes.up) {
            $scope.item.userVote.upVote = true;
            $scope.item.userVote.downVote = false;
        } else if (votes.vote_type === VoteService.voteTypes.down) {
            $scope.item.userVote.downVote = true;
            $scope.item.userVote.upVote = false;
        }
    }

    /**
     * Retrieving Comments, vote type on `itemLoaded` $broadcast.
     */
    $scope.$on('itemLoaded', function() {
        // Retrieve item's comment.
        CommentService.filterByObject(1, $scope.item.id).then(
            function(data, status, headers, config) {
                $scope.item.comments = data.data.results;
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
                $scope.item.id,
                $scope.user.id
            ).then(
                function(data, status, headers, config) {
                    updateItemVote(data.data.votes);
                },
                function(data, status, headers, config) {
                    $log.error(data.data.error);
                }
            );
        }

        $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
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
            CommentService.create(1, $scope.item.id, comment.text).then(
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

        VoteService.upVote(VoteService.objectTypes.item, item.id).then(
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

        VoteService.downVote(VoteService.objectTypes.item, item.id).then(
            function(data, status, headers, config) {
                updateItemVote(data.data.vote);
            },
            function(data, status, headers, config) {
                $log.error(data.error);
            }
        )
    };

    /**
     * Check Auth
     * Check if the user is authenticated when trying to write a comment.
     *
     * @method checkAuth
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.checkAuth = function() {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
        }
    };

    /**
     * Delete Comment
     *
     * @method deleteComment
     * @param {Object} comment
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.deleteComment = function(comment) {
        if (comment.user.id === $scope.user.id) {
            CommentService.remove(comment.id).then(
                function(data, status, headers, config) {
                    $scope.item.comments.splice($scope.item.comments.indexOf(comment), 1);
                },
                function(data, status, headers, config) {
                    $log.error(data.error);
                }
            )
        }
    };

    $scope.editComment = function(comment) {
        console.log(comment);
        console.log(comment.user.id);
        console.log($scope.user.id);
        if (comment.user.id === $scope.user.id) {
            if ($scope.isEditing) {
                $scope.isEditing = false;
            } else {
                $scope.isEditing = true;
                $scope.editInput = comment.comment;
            }
        }
    }
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
    '$ionicSlideBoxDelegate',
    'gettextCatalog',
    'ToastService',
    'ItemService',
    'CommentService',
    'VoteService',
    'AuthenticationService'
];
