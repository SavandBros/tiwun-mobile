/**
 * @name RegisterController
 * @namespace tiwun.account.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers', [
        'tiwun.account.services'
    ])
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$stateParams', 'AuthenticationService'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, $stateParams, AuthenticationService) {
        var vm = this;

        vm.register = register;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.account.controllers.RegisterController
         */
        function activate() {
            // if the user is authenticated, they should not be here.
            if (AuthenticationService.isAuthenticated()) {
                $location.url('/');
            }
        }

        /**
         * @name register
         * @desc Register a new user
         * @memberOf tiwun.account.controllers.RegisterController
         */
        function register() {
            Authentication.register(vm.email, vm.password, vm.username);
        }
    }
})();