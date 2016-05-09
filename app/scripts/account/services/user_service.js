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
     */
    function get(userId) {
        return $http.get(ENV.apiEndpoint + 'account/user/' + userId + '/');
    }

    /**
     * Update the account with username `username`
     */
    function update(user) {
        return $http.put(ENV.apiEndpoint + 'account/update-profile/' + user.pk + '/', user);
    }

    return {
        get: get,
        update: update
    };
}

angular.module('tiwun.account.services.UserService')
    .factory('UserService', UserService);

UserService.$inject = ['$http', 'ENV'];
