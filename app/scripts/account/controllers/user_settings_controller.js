/*global angular*/
'use strict';

/**
 * Use rSettings Controller
 *
 * @param {Object} $scope
 * @param {Object} $state
 * @param {Object} $log
 * @param {Object} gettextCatalog
 * @param {ToastService} ToastService
 * @param {UserService} UserService
 * @param {AuthenticationService} AuthenticationService
 *
 * @class UserSettingsController
 * @namespace tiwun.account.controllers.UserSettingsController
 */
function UserSettingsController($scope, $state, $log, $stateParams, gettextCatalog, ToastService, UserService, AuthenticationService) {
    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf tiwun.account.controllers.UserSettingsController
     */
    function constructor() {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
            ToastService.show(gettextCatalog.getString('You are not authorized to access this page.'));
        } else {
            UserService.get($stateParams.userId).then(
                function(data, status, headers, config) {
                    /**
                     * Current user that is logged and is trying to update settings.
                     *
                     * @property {Object} user
                     */
                    $scope.user = data.data;

                    // Load current user data to settings data
                    $scope.setting = {
                        name: $scope.user.name,
                        real_name: $scope.user.real_name,
                        website: $scope.user.website,
                        location: $scope.user.location,
                        about: $scope.user.about,
                    }
                },
                function(data, status, headers, config) {
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

        // Should not send null values
        if (user.website === null)
            user.website = "";
        if (user.location === null)
            user.location = "";

        UserService.update(user).then(
            function(data, status, headers, config) {

                // Alert and redirect user
                ToastService.show(gettextCatalog.getString(data.data.message));
                $state.go('app.userProfile', {
                    'userId': $scope.user.id
                });
            },
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

UserSettingsController.$inject = ['$scope', '$state', '$log', '$stateParams', 'gettextCatalog', 'ToastService', 'UserService', 'AuthenticationService'];
