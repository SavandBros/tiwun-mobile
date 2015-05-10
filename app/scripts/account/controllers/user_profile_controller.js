/*global angular*/
'use strict';

/**
 * User Profile Controller
 *
 * @class UserProfileController
 * @namespace tiwun.account.controllers.UserProfileController
 */
function UserProfileController($scope, $stateParams, UserService) {
    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf UserProfileController
     */
    function constructor() {
        UserService.get($stateParams['userId']).then(
            function (data, status, headers, config) {
                $scope.user = data.data;
            },
            function (data, status, headers, config) {
                console.log('Error in getting user: ' + data.error);
            }
        );
    }

    constructor();
}


angular.module('tiwun.account.controllers.UserProfileController', [
    'tiwun.account.services.UserService'
])
    .controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', '$stateParams', 'UserService'];
