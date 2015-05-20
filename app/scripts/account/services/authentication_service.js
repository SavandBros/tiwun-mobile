/*global angular*/
'use strict';

/**
 * Authentication Service
 *
 * @param $rootScope
 * @param $http
 * @param $log
 * @param $window
 * @param ENV
 * @class AuthenticationService
 * @returns [Factory]
 * @namespace tiwun.account.services.AuthenticationService
 */
function AuthenticationService($rootScope, $http, $log, $window, ENV) {
    /**
     * Return the currently authenticated user
     *
     * @method getAuthenticatedUser
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function getAuthenticatedUser() {
        if ($window.localStorage.getItem('authenticatedUser')) {
            return JSON.parse($window.localStorage.getItem('authenticatedUser'));
        }
    }

    /**
     * parseJwt
     * Parse JWT from token
     *
     * @method parseJwt
     * @param {String }token
     * @memberOf tiwun.account.services.AuthenticationService
     * @returns {Object} Parsed json
     */
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse($window.atob(base64));
    }

    /**
     * setToken
     * Set token to localStorage
     *
     * @method setToken
     * @param {String } token
     * @memberOf tiwun.account.services.AuthenticationService
     * @returns {NaN}
     */
    function setToken(token) {
        $window.localStorage['jwtToken'] = token;
    }

    /**
     * getToken
     * Return token from localStorage
     *
     * @method getToken
     * @memberOf tiwun.account.services.AuthenticationService
     * @returns {undefined|String|Object}
     */
    function getToken() {
        return $window.localStorage['jwtToken'];
    }

    /**
     * Check if the current user is authenticated
     *
     * @method isAuthenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function isAuthenticated() {
        //return !!$cookies.authenticatedUser;
        var token = getToken();
        var isValid;

        if (token) {
            var params = parseJwt(token);

            isValid = Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            isValid = false;
        }

        if (!isValid) {
            unAuthenticate();
        }

        return isValid;
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
            function(data, status, headers, config) {
                setAuthenticatedUser(data.data.user);
                setToken(data.data.token);

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Authenticated');
            },
            // Log "Epic failure!" to the console
            function(data, status, headers, config) {
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
        return $http.post(ENV.apiEndpoint + 'users/logout/').then(
            function(data, status, headers, config) {
                unAuthenticate();
                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:SignedOut');
            },
            function(data, status, headers, config) {
                $log.error('Epic failure on logout :|');
            }
        );
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
        }).then(
            function(data, status, headers, config) {
                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Registered');
                login(email, password);

            },
            function(data, status, headers, config) {
                $log.error('Epic failure in registering user!. Let me just pretend I\'m doing a good job at logging!');
            }
        );
    }

    /**
     * Stringify the account object and store it in a cookie
     *
     * @method setAuthenticatedUser
     * @param {Object} authenticatedUser The account object to be stored
     * @returns {undefined}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function setAuthenticatedUser(authenticatedUser) {
        $window.localStorage['authenticatedUser'] = JSON.stringify(authenticatedUser);
    }

    /**
     * Delete the cookie where the account object is stored
     *
     * @method unAuthenticate
     * @returns {undefined}
     * @memberOf tiwun.account.services.AuthenticationService
     */
    function unAuthenticate() {
        $window.localStorage.removeItem('jwtToken');
        $window.localStorage.removeItem('authenticatedUser');
    }

    /**
     * @name AuthenticationService
     * @desc The Factory to be returned
     */
    return {
        parseJwt: parseJwt,
        setToken: setToken,
        getToken: getToken,
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

AuthenticationService.$inject = ['$rootScope', '$http', '$log', '$window', 'ENV'];
