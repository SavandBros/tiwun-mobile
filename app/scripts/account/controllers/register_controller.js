/**
 * @name RegisterController
 * @namespace tiwun.account.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers.RegisterController', [
        'tiwun.account.services.AuthenticationService'
    ])
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$stateParams', 'AuthenticationService'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, $stateParams, AuthenticationService) {
        constructor();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.account.controllers.RegisterController
         */
        function constructor() {
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
        $scope.register = function register(form, user) {
            if (form) {
                if (user.password !== user.confirm_password) {
                    form.confirm_password.$error.not_match = true;
                    form.$invalid = true;
                    return;
                }
            }

            AuthenticationService.register(user.email, user.password);
        }
    }
})();
