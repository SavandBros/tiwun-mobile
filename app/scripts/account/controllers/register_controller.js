/*global angular*/
'use strict';

/**
 * Register Controller
 *
 * @class RegisterController
 * @namespace tiwun.account.controllers.RegisterController
 */
function RegisterController($window, $ionicHistory, $state, $rootScope, $scope, $log, AuthenticationService) {
    $scope.registerErrors = {};

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
        AuthenticationService.login(email, password).then(
            function(data, status, headers, config) {
                $log.info('Success login');

                AuthenticationService.setAuthenticatedUser(data.data.user);
                AuthenticationService.setToken(data.data.token);

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Authenticated');
            },
            null
        );
    });

    $scope.$on('tiwun.account.service.AuthenticationService:Authenticated', function() {
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
            if (user.password != user.confirmPassword) {
                form.confirmPassword.$error.not_match = true;
                form.$invalid = true;
                return;
            } else {
                form.confirmPassword.$error.not_match = false;
            }
        }

        AuthenticationService.register(user.email, user.name, user.password).then(
            function(data, status, headers, config) {
                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Registered');

            },
            function(data, status, headers, config) {
                console.log(data.data);
                $scope.registerErrors = data.data;
                $log.error('Epic failure in registering user!. Let me just pretend I\'m doing a good job at logging!');
            }
        );;
    };
}

angular.module('tiwun.account.controllers.RegisterController', [
        'tiwun.account.services.AuthenticationService'
    ])
    .controller('RegisterController', RegisterController);

RegisterController.$inject = [
    '$window',
    '$ionicHistory',
    '$state',
    '$rootScope',
    '$scope',
    '$log',
    'AuthenticationService'
];
