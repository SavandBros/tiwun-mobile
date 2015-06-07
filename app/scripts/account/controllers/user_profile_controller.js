/*global angular*/
'use strict';

/**
 * User Profile Controller
 *
 * @class UserProfileController
 * @namespace tiwun.account.controllers.UserProfileController
 */
function UserProfileController($scope, $stateParams, $log, UserService, ItemService) {
    $scope.activeTab = "items";

    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf UserProfileController
     */
    function constructor() {
        UserService.get($stateParams['userId']).then(
            function(data, status, headers, config) {
                $scope.profile = data.data.user;
            },
            function(data, status, headers, config) {
                $log.error('Error in getting user: ' + data.error);
            }
        );
    }

    $scope.activateTab = function(tab) {
        if (tab != $scope.activeTab) {
            $scope.activeTab = tab;

            if (tab === 'items') {
                ItemService.items(1, {
                    user_id: $scope.profile.id
                }).then(
                    function(data, status, headers, config) {
                        $scope.profileItems = data.data.items
                    },
                    function(data, status, headers, config) {
                        $log.error('Error in getting user items: ' + data.error);
                    }
                );
            }
        }
    };

    constructor();
}


angular.module('tiwun.account.controllers.UserProfileController', [
        'tiwun.account.services.UserService',
        'tiwun.item.services.ItemService'
    ])
    .controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', '$stateParams', '$log', 'UserService', 'ItemService'];
