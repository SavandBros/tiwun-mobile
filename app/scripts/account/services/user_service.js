/*global angular*/
'use strict';

/**
 * User Service
 *
 * @class UserService
 * @param $http
 * @param ENV
 * @namespace tiwun.account.services.UserService
 */
function UserService($http, ENV) {
    /**
     * Gets the account with username `username`
     *
     * @method get
     * @param {string} userId The user's ID to get.
     * @returns {Promise}
     * @memberOf tiwun.account.services.UserService
     */
    function get(userId) {
        return $http.get(ENV.apiEndpoint + 'users/', {
            params: {
                id: userId
            }
        });
    }

    /**
     * Update the account with username `username`
     *
     * @method update
     * @param {Object} user The updated account model
     * @returns {Promise}
     * @memberOf tiwun.account.services.UserService
     */
    function update(user) {
        return $http.put(ENV.apiEndpoint + 'users/' + user.pk + '/', user);
    }

    return {
        get: get,
        update: update
    };
}

angular.module('tiwun.account.services.UserService')
    .factory('UserService', UserService);

UserService.$inject = ['$http', 'ENV'];
