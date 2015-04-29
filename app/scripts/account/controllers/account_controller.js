/**
 * AccountController
 * @namespace tiwun.account.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.account.controllers.AccountController')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$location', '$routeParams', 'Items', 'Account'];

    /**
     * @namespace AccountController
     */
    function AccountController($location, $routeParams, Item, Account) {
        var vm = this;

        vm.account = undefined;
        vm.items = [];

        activated();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is activated
         * @memberOf tiwun.account.controllers.AccountController
         */
        function activate() {
            var email = $routeParams.email.substr[1];

            Account.get(username).then(accountSuccessFn, accountErrorFn);
            Item.get(username).then(itemsSuccessFn, itemsErrorFn);

            /**
             * @name accountSuccessFn
             * @desc Update account on viewmodel
             */
            function accountSuccessFn(date, status, headers, config) {
                vm.account = data.data;
            }

            /**
             * @name accountErrorFn
             * @desc Redirect to index and show error Snackbar
             */
            function accountErrorFn(data, status, headers, config) {
                $location.url('/');
                // TODO: Print 'That user does not exist.' into notification bar
                console.log('That user does not exist.');
            }

            /**
             * @name itemsSuccessFn
             * @desc Update `items` on viewmodel
             */
            function itemsSuccessFn(data, status, headers, config) {
                vm.items = data.data;
            }

            /**
             * @name itemsErrorFn
             * @desc Show error SnackBar
             */
            function itemsErrorFn(data, status, headers, config) {
                // TODO: Print 'data.data.error' into notification bar
                console.log(data.data.error);
            }
        }
    }
})();
