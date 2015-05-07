/**
 * UserSettingsController
 * @class UserSettingsController
 * @namespace tiwun.account.controllers.UserSettingsController
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers.UserSettingsController', [
        'tiwun.account.services.UserService',
        'tiwun.account.services.AuthenticationService'
    ])
        .controller('UserSettingsController', UserSettingsController);

    UserSettingsController.$inject = ['$scope', '$state', 'UserService', 'AuthenticationService'];

    function UserSettingsController($scope, $state, UserService, AuthenticationService) {
        constructor();

        /**
         * Actions to be performed when this controller is instantiated
         *
         * @method constructor
         * @memberOf tiwun.account.controllers.UserSettingsController
         */
        function constructor() {
            if (!AuthenticationService.isAuthenticated()) {
                $state.go('app.login');
                console.log("You're not authorized to access this page.")
            } else {
                UserService.get($stateParams['userId']).then(
                    function (data, status, headers, config) {
                        $scope.user = data.data;
                    },
                    function (data, status, headers, config) {
                        console.log('Error in getting user: ' + data.error);
                    }
                );
            }
        }

        /**
         * Pass user settings to `UserService.update` method to update the user settings.
         *
         * @method updateAccount
         * @param {Object} form Submitted form contains user settings to be updated
         * @param {Object} user The user model from angular that need to be passed to `UserService` to get updated.
         */
        $scope.updateAccount = function(form, user) {
            UserService.update(user).then(
                function (data, status, headers, config) {
                    console.log('Has been updated successfully!')
                },
                function (data, status, headers, config) {
                    console.log('Error in updating user account settings: ' + data.error);
                }
            );
        }
    }
})();
