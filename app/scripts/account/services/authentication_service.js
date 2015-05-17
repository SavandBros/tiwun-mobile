/*global angular*/
'use strict';

/**
 * Authentication Service
 *
 * @param $rootScope
 * @param $cookies
 * @param $http
 * @param $log
 * @param ENV
 * @class AuthenticationService
 * @returns [Factory]
 * @namespace tiwun.account.services.AuthenticationService
 */
function AuthenticationService($rootScope, $cookies, $http, $log, ENV) {
    /**
     * Return the currently authenticated user
     *
     * @method getAuthenticatedUser
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
     * Check if the current user is authenticated
     *
     * @method isAuthenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function isAuthenticated() {
        return !!$cookies.authenticatedUser;
    }

    /**
     * Try to log in with email `email` and password `password`
     *
     * @method login
     * @param {String} email The email entered by the user
     * @param {String} password The password entered by the user
     * @returns {Promise}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function login(email, password) {
        return $http.post(ENV.apiEndpoint + 'users/login/', {
            email: email,
            password: password
        }).then(
            // Set the authenticated account and redirect to index
            function (data, status, headers, config) {
                setAuthenticatedUser(data.data);

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Authenticated');
            },
            // Log "Epic failure!" to the console
            function (data, status, headers, config) {
                $log.error(data.error);
            }
        );
    }

    /**
     * Try to log the user out
     *
     * @method logout
     * @returns {Promise}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function logout() {
        return $http.post(ENV.apiEndpoint + 'users/logout/')
            .then(logoutSuccessFn, logoutErrorFn);

        /**
         * UnAuthenticate and redirect to index with page reload
         *
         * @method logoutSuccessFn
         */
        function logoutSuccessFn(data, status, headers, config) {
            unAuthenticate();

            $rootScope.$broadcast('tiwun.account.service.AuthenticationService:SignedOut');
        }

        /**
         * Log "Epic failure!" to the console.
         *
         * @method logoutErrorFn
         */
        function logoutErrorFn(data, status, headers, config) {
            $log.error('Epic failure!');
        }
    }

    /**
     * Try to register a new user
     *
     * @method register
     * @param {String} email The email entered by the user
     * @param {String} password The password entered by the user
     * @returns {Promise}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function register(email, password) {
        return $http.post(ENV.apiEndpoint + 'users/', {
            email: email,
            password: password
        }).then(registerSuccessFn, registerErrorFn);

        /**
         * Log the new user in.
         *
         * @method registerSuccessFn
         */
        function registerSuccessFn(data, status, headers, config) {
            $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Registered');

            login(email, password);
        }

        /**
         * Log "Epic failure!" to the console
         *
         * @method registerErrorFn
         */
        function registerErrorFn(data, status, headers, config) {
            $log.error('Epic failure!');
        }
    }

    /**
     * Stringify the account object and store it in a cookie
     *
     * @method setAuthenticatedUser
     * @param {Object} account The account object to be stored
     * @returns {undefined}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function setAuthenticatedUser(account) {
        $cookies.authenticatedUser = JSON.stringify(account);
    }

    /**
     * Delete the cookie where the account object is stored
     *
     * @method unAuthenticate
     * @returns {undefined}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function unAuthenticate() {
        delete $cookies.authenticatedUser;
    }

    /**
     * @name AuthenticationService
     * @desc The Factory to be returned
     */
    return {
        getAuthenticatedUser: getAuthenticatedUser,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register,
        setAuthenticatedUser: setAuthenticatedUser,
        unAuthenticate: unAuthenticate
    };
}

angular.module('tiwun.account.services.AuthenticationService')
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$rootScope', '$cookies', '$http', '$log', 'ENV'];
