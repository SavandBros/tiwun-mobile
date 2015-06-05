/*global angular*/
'use strict';

/**
 * User Profile Controller
 *
 * @class UserProfileController
 * @namespace tiwun.account.controllers.UserProfileController
 */
function UserProfileController($scope, $stateParams, $log, UserService) {
    $scope.activeTab = "about";

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
        }
    }

    constructor();
}


angular.module('tiwun.account.controllers.UserProfileController', [
        'tiwun.account.services.UserService'
    ])
    .controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', '$stateParams', '$log', 'UserService'];
