/**
 * AuthenticationService
 * @namespace tiwun.account.services
 */
(function () {
    'use strict';

    angular.module('tiwun.account.services.AuthenticationService')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$rootScope', '$cookies', '$http'];

    /**
     * @namespace AuthenticationService
     * @returns [Factory]
     */
    function AuthenticationService($rootScope, $cookies, $http) {
        /**
         * @name AuthenticationService
         * @desc The Factory to be returned
         */
        var AuthenticationService = {
            getAuthenticatedUser: getAuthenticatedUser,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            setAuthenticatedUser: setAuthenticatedUser,
            unAuthenticate: unAuthenticate
        };

        return AuthenticationService;

        /**
         * @name getAuthenticatedUser
         * @des Return the currently authenticated user
         * @returns {object|undefined} Account if authenticated, else `undefined`
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function getAuthenticatedUser() {
            if (!$cookies.authenticatedUser) {
                return;
            }

            return JSON.parse($cookies.authenticatedUser);
        }

        /**
         * @name isAuthenticated
         * @desc Check if the current user is authenticated
         * @returns {boolean} True is user is authenticated, else false.
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedUser;
        }

        /**
         * @name login
         * @desc Try to log in with email `email` and password `password`
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @returns {Promise}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function login(email, password) {
            return $http.post('https://127.0.0.1:8000/api/users/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect to index
             */
            function loginSuccessFn(data, status, headers, config) {
                AuthenticationService.setAuthenticatedUser(data.data);

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Authenticated');
            }

            /**
             * @name loginErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function loginErrorFn(data, status, headers, config) {
                console.log(data.error);
            }
        }

        /**
         * @name logout
         * @desc Try to log the user out
         * @returns {Promise}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function logout() {
            return $http.post('https://127.0.0.1:8000/api/users/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            /**
             * @name logoutSuccessFn
             * @desc UnAuthenticate and redirect to index with page reload
             */
            function logoutSuccessFn(data, status, headers, config) {
                AuthenticationService.unAuthenticate();

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:SignedOut');
            }

            /**
             * @name logoutErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function logoutErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        /**
         * @name register
         * @desc Try to register a new user
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @returns {Promise}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function register(email, password) {
            return $http.post('https://127.0.0.1:8000/api/users/', {
                email: email,
                password: password
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * @name registerSuccessFn
             * @desc Log the new user in
             */
            function registerSuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Registered');

                AuthenticationService.login(email, password);
            }

            /**
             * @name registerErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function registerErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        /**
         * @name setAuthenticatedUser
         * @desc Stringify the account object and store it in a cookie
         * @param {Object} account The acount object to be stored
         * @returns {undefined}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function setAuthenticatedUser(account) {
            $cookies.authenticatedUser = JSON.stringify(account);
        }

        /**
         * @name unAuthenticate
         * @desc Delete the cookie where the account object is stored
         * @returns {undefined}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function unAuthenticate() {
            delete $cookies.authenticatedUser;
        }
    }
})();
