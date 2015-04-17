/**
 * LoginController
 * @namespace tiwun.account.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'AuthenticationService'];

    /**
     * @namespace LoginController
     */
    function LoginController($location, $scope, AuthenticationService) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.account.controllers.LoginController
         */
        function activate() {
            // if the use is authenticated, they should not be here.
            if (AuthenticationService.isAuthenticated()) {
                $location.url('/');
            }
        }

        /**
         * @name login
         * @desc Log the user in
         * @memberOf tiwun.account.controllers.LoginController
         */
        function login() {
            AuthenticationService.login(vm.email, vm.password);
        }
    }
})();
