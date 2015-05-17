/*global angular*/
'use strict';

/**
 * Use rSettings Controller
 *
 * @class UserSettingsController
 * @namespace tiwun.account.controllers.UserSettingsController
 */
function UserSettingsController($scope, $state, $log, ToastService, UserService, AuthenticationService) {
    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf tiwun.account.controllers.UserSettingsController
     */
    function constructor() {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            ToastService.show('You\'re not authorized to access this page.');
        } else {
            UserService.get($stateParams.userId).then(
                function (data, status, headers, config) {
                    /**
                     * Current user that is logged and is trying to update settings.
                     *
                     * @property {Object} user
                     */
                    $scope.user = data.data;
                },
                function (data, status, headers, config) {
                    ToastService.show('Error in getting user: ' + data.data.error);
                }
            );
        }
    }

    constructor();

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
            },
            function (data, status, headers, config) {
                $log.error('Error in updating user account settings: ' + data.error);
            }
        );
    };
}


angular.module('tiwun.account.controllers.UserSettingsController', [
    'tiwun.account.services.UserService',
    'tiwun.account.services.AuthenticationService',
    'tiwun.basement.services.ToastService'
])
    .controller('UserSettingsController', UserSettingsController);

UserSettingsController.$inject = ['$scope', '$state', '$log', 'ToastService', 'UserService', 'AuthenticationService'];
