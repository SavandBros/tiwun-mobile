/**
 * AccountSettingsController
 * @namespace tiwun.account.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers.AccountSettingsController')
        .controller('AccountSettingsController', AccountSettingsController);

    AccountSettingsController.$inject = [
        '$location',
        '$routeParams',
        'AuthenticationService',
        'UserService'
    ];

    /**
     * @namespace AccountSettingsController
     */
    function AccountSettingsController($location, $routeParams, AuthenticationService, UserService) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated.
         * @memberOf tiwun.account.controllers.AccountSettingsController
         */
        function activate() {
            var authenticatedUser = AuthenticationService.getAuthenticatedUser();
            var email = $routeParams.email.substr(1);

            // Redirect if not logged in
            if (!authenticatedUser) {
                $location.url('/');
                console.log("You are not authorized to view this page.");
            } else {
                // Redirect if logged in, but not owner of this account.
                if (authenticatedUser.email !== email) {
                    debugger;
                    $location.url('/');
                    console.log("You are not authorized to view this page/")
                }
            }

            UserService.get(email).then(accountSuccessFn, accountErrorFn);

            /**
             * @name accountSuccessFn
             * @desc Update `account` for view
             */
            function accountSuccessFn(data, status, headers, config) {
                vm.account = data.data;
            }

            /**
             * @name accountErrorFn
             * @desc Redirect to index
             */
            function accountErrorFn(data, status, headers, config) {
                $location.url('/');
                console.log('That user does not exist.');
            }
        }

        /**
         * @name destroy
         * @desc Destroy this account
         * @memberOf tiwun.accounts.controllers.AccountSettingsController
         */
        function destroy() {
            UserService.destroy(vm.account.username).then(accountSuccessFn, accountErrorFn);

            /**
             * @name accountSuccessFn
             * @desc Redirect to index and display success snackbar
             */
            function accountSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                window.location = '/';

                console.log('Your account has been deleted.');
            }


            /**
             * @name accountErrorFn
             * @desc Display error snackbar
             */
            function accountErrorFn(data, status, headers, config) {
                console.log(data.error);
            }
        }


        /**
         * @name update
         * @desc Update this account
         * @memberOf tiwun.accounts.controllers.AccountSettingsController
         */
        function update() {
            var username = $routeParams.username.substr(1);

            UserService.update(username, vm.account).then(accountSuccessFn, accountErrorFn);

            /**
             * @name accountSuccessFn
             * @desc Show success snackbar
             */
            function accountSuccessFn(data, status, headers, config) {
                console.log('Your account has been updated.');
            }


            /**
             * @name accountErrorFn
             * @desc Show error snackbar
             */
            function accountErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();
