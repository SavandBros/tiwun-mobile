/**
 * LoginController
 * @namespace tiwun.account.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers.LoginController', [
        'tiwun.account.services.AuthenticationService'
    ])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window', '$state', '$scope', 'AuthenticationService'];

    /**
     * @namespace LoginController
     */
    function LoginController($window, $state, $scope, AuthenticationService) {
        constructor();
        /**
         * @name constructor
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.account.controllers.LoginController
         */
        function constructor() {
            console.log('LoginController');
            // if the use is authenticated, they should not be here.
            if (AuthenticationService.isAuthenticated()) {
                $state.go('app.explore');
            }
        }

        $scope.$on('tiwun.account.service.AuthenticationService:Authenticated', function () {
            $state.go('app.explore', {}, {reload: true});
            $window.location.reload(true)
        });

        /**
         * @name login
         * @desc Log the user in
         * @memberOf tiwun.account.controllers.LoginController
         */
        $scope.login = function (form, user) {
            AuthenticationService.login(user.email, user.password);
        };
    }
})();
