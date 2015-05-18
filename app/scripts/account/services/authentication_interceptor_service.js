/*global angular*/
'use strict';

/**
 * Authentication Interceptor Service
 *
 * @class AuthenticationInterceptorService
 * @namespace tiwun.account.services.AuthenticationInterceptorService
 * @param {Object} Env
 * @param {tiwun.account.services.AuthenticationService} AuthenticationService
 *
 */
function AuthenticationInterceptorService(Env, AuthenticationService) {
    /**
     * request
     * Automatically attach Authorization header
     *
     * @method request
     * @param {Object} config
     * @memberOf tiwun.account.services.AuthenticationInterceptorService
     * @returns {Object}
     */
    function request(config) {
        var token = AuthenticationService.getToken();

        if (config.url.indexOf(ENV.apiEndPoint === 0 && token)) {
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    }

    /**
     * response
     * If a token was sent back, save it
     *
     * @method response
     * @param {Object} res
     * @memberOf tiwun.account.services.AuthenticationInterceptorService
     * @returns {*}
     */
    function response(res) {
        if (res.config.url.indexOf(ENV.apiEndPoint) == 0 && res.data.token) {
            AuthenticationService.saveToken(res.data.token);
        }

        return res;
    }

    return {
        request: request,
        response: response
    }
}

angular.module('tiwun.account.service.AuthenticationInterceptorService', [
    'tiwun.account.services.AuthenticationService'
]);

AuthenticationInterceptorService.$inject = ['ENV', 'AuthenticationInterceptorService'];
