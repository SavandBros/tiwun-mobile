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

    RegisterController.$inject = ['$window', '$ionicHistory', '$state', '$scope', '$stateParams', 'AuthenticationService'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($window, $ionicHistory, $state, $scope, $stateParams, AuthenticationService) {
        constructor();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.account.controllers.RegisterController
         */
        function constructor() {
            // if the user is authenticated, they should not be here.
            if (AuthenticationService.isAuthenticated()) {
                $ionicHistory.goBack();
            }
        }

        $scope.$on('tiwun.account.service.AuthenticationService:Registered', function() {
            console.log('registered');
            $state.go('app.explore', {}, {reload: true});
            $window.location.reload(true)
        });

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
