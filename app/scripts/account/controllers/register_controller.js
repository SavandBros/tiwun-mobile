/*global angular*/
'use strict';

/**
 * Register Controller
 *
 * @class RegisterController
 * @namespace tiwun.account.controllers.RegisterController
 */
function RegisterController($window, $ionicHistory, $state, $scope, AuthenticationService) {
    constructor();

    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf tiwun.account.controllers.RegisterController
     */
    function constructor() {
        // if the user is authenticated, they should not be here.
        if (AuthenticationService.isAuthenticated()) {
            $ionicHistory.goBack();
        }
    }

    $scope.$on('tiwun.account.service.AuthenticationService:Registered', function() {
        $state.go('app.explore', {}, {
            reload: true
        });
        $window.location.reload(true);
    });

    /**
     * Register a new user
     *
     * @method register
     * @memberOf tiwun.account.controllers.RegisterController
     */
    $scope.register = function register(form, user) {
        if (form) {
            if (user.password !== user.confirmPassword) {
                form.confirmPassword.$error.not_match = true;
                form.$invalid = true;
                return;
            }
        }

        AuthenticationService.register(user.email, user.password);
    };
}

angular.module('tiwun.account.controllers.RegisterController', [
        'tiwun.account.services.AuthenticationService'
    ])
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$window', '$ionicHistory', '$state', '$scope', 'AuthenticationService'];
