/*global angular*/
'use strict';

/**
 * User Profile Controller
 *
 * @class UserProfileController
 * @namespace tiwun.account.controllers.UserProfileController
 */
function UserProfileController($scope, $stateParams, $log, UserService, ItemService, CommentService) {
    $scope.profileItems = [];
    $scope.profileComments = [];
    $scope.pageCounter = 0;
    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf UserProfileController
     */
    function constructor() {
        UserService.get($stateParams['userId']).then(
            function(data, status, headers, config) {
                $scope.profile = data.data;
                $scope.activateTab('items');
            },
            function(data, status, headers, config) {
                $log.error('Error in getting user: ' + data.error);
            }
        );
    }

    $scope.activateTab = function(tab) {
        if (tab != $scope.activeTab) {
            $scope.activeTab = tab;
            $scope.pageCounter = 0;

            if (tab === 'items') {
                ItemService.userItems($scope.profile.id, 1).then(
                    function(data, status, headers, config) {
                        $scope.profileItems = data.data.results;
                    },
                    function(data, status, headers, config) {
                        $log.error('Error in getting user items: ' + data.error);
                    }
                );
            } else if (tab === 'comments') {
                CommentService.userComments(
                    $scope.profile.id
                ).then(
                    function(data, status, headers, config) {
                        $scope.profileComments = data.data.results;
                        $scope.pageHasNext = data.data.page_has_next;
                    },
                    function(data, status, headers, config) {
                        $log.error('Error in getting user comments: ' + data.error);
                    }
                );
            }
        }
    };

    $scope.loadMore = function(tab) {

        if (tab === 'items') {

            ItemService.userItems($stateParams.userId, ++$scope.pageCounter).then(
                function(data, status, headers, config) {
                    $scope.profileItems = $scope.profileItems.concat(data.data.results);
                    $scope.pageHasNext = data.data.page_has_next;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function(data, status, headers, config) {
                    $log.error(data.error);
                }
            );
        }
    };

    constructor();
    $scope.loadMore('items');
}


angular.module('tiwun.account.controllers.UserProfileController', [
        'tiwun.account.services.UserService',
        'tiwun.item.services.ItemService',
        'tiwun.sushial.services.CommentService'
    ])
    .controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', '$stateParams', '$log', 'UserService', 'ItemService', 'CommentService'];
