/*global angular*/
'use strict';

/**
 * SingleItemController
 *
 * @class SingleItemController
 * @namespace tiwun.item.controllers
 **/
function SingleItemController($scope, $stateParams, $ionicHistory, ItemService, CommentService, AuthenticationService) {
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
        $scope.auth = AuthenticationService;
        var user = $scope.auth.getAuthenticatedUser();

        if ($scope.auth.isAuthenticated()) {
            console.log(form, comment);
            CommentService.create(1, $scope.item.pk, user.pk, comment.text).then(
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
}


angular.module('tiwun.item.controllers.SingleItemController', [
    'tiwun.item.services.ItemService',
    'tiwun.sushial.services.CommentService',
    'tiwun.account.services.AuthenticationService'
])
    .controller('SingleItemController', SingleItemController);

SingleItemController.$inject = [
    '$scope',
    '$stateParams',
    '$ionicHistory',
    'ItemService',
    'CommentService',
    'AuthenticationService'
];

