/*global angular*/
'use strict';

/**
 * Login Controller
 *
 * @class LoginController
 * @namespace tiwun.account.controllers.LoginController
 */
function LoginController($window, $state, $scope, AuthenticationService) {
    /**
     * Actions to be performed when this controller is instantiated
     *
     * @method constructor
     * @memberOf tiwun.account.controllers.LoginController
     */
    function constructor() {
        // if the use is authenticated, they should not be here.
        if (AuthenticationService.isAuthenticated()) {
            $state.go('app.explore');
        }
    }

    constructor();

    $scope.$on('tiwun.account.service.AuthenticationService:Authenticated', function () {
        $state.go('app.explore', {}, {reload: true});
        $window.location.reload(true);
    });

    /**
     * Log the user in
     *
     * @method login
     * @memberOf tiwun.account.controllers.LoginController
     */
    $scope.login = function (form, user) {
        AuthenticationService.login(user.email, user.password);
    };
}

angular.module('tiwun.account.controllers.LoginController', [
    'tiwun.account.services.AuthenticationService'
])
    .controller('LoginController', LoginController);

LoginController.$inject = ['$window', '$state', '$scope', 'AuthenticationService'];
