/*global angular*/
'use strict';

/**
 * SingleItemController
 *
 * @class SingleItemController
 * @namespace tiwun.item.controllers
 **/
function SingleItemController($scope, $stateParams, $ionicHistory, $state, ItemService, CommentService, VoteService, AuthenticationService) {
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
            function (data, status, headers, config) {
                $scope.context = data.data;
                $scope.item = $scope.context.item;

                CommentService.filterByObject(1, $scope.item.pk).then(
                    function (data, status, headers, config) {
                        $scope.item.comments = data.data;
                    },
                    function (data, status, headers, config) {
                        console.log("[error] on getting comments!");
                        console.log(data.error);
                    }
                );
                VoteService.userVotedForObject(
                    VoteService.objectTypes.item,
                    $scope.item.pk,
                    AuthenticationService.getAuthenticatedUser().pk
                ).then(
                    function (data, status, headers, config) {
                        $scope.item.userVote = data.data;
                    },
                    function (data, status, headers, config) {
                        console.log(data.data.error);
                    }
                );
            },
            function (data, status, headers, config) {
                console.log('Error on receiving item');
                console.log(data.error);
                $ionicHistory.goBack();
            }
        );
    }

    constructor();

    /**
     * Add Comment to the item.
     *
     * @method addComment
     * @param {Object} form
     * @param {Object} comment
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.addComment = function (form, comment) {
        if ($scope.auth.isAuthenticated()) {
            console.log(form, comment);
            CommentService.create(1, $scope.item.pk, $scope.user.pk, comment.text).then(
                function (data, status, headers, config) {
                    $scope.item.comments = $scope.item.comments.concat(data.data);
                },
                function (data, status, headers, config) {
                    console.log('commenting error');
                    console.log(data.error)
                }
            );
        }
    };

    /**
     * Up vote for the current item in the single item page.
     *
     * @method upVote
     * @memberOf tiwun.item.controllers.SingleItemController
     */
    $scope.upVote = function () {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
        }

        VoteService.upVote(VoteService.objectTypes.item, $scope.item.pk, $scope.user.pk).then(
            function (data, status, headers, config) {
                console.log(data.data);
            },
            function (data, status, headers, config) {
                console.log(data.error);
            }
        )
    }
}


angular.module('tiwun.item.controllers.SingleItemController', [
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
    'ItemService',
    'CommentService',
    'VoteService',
    'AuthenticationService'
];

