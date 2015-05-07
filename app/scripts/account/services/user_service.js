/**
 * User Service
 *
 * @class UserService
 * @namespace tiwun.accounts.services
 */
(function () {
    'use strict';

    angular.module('tiwun.account.services.UserService')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];


    function UserService($http) {
        /**
         * Keeps all the method available on the User Service.
         *
         * @property UserService
         * @type {{destroy: destroy, get: get, update: update}}
         */
        var UserService = {
            destroy: destroy,
            get: get,
            update: update
        };

        return UserService;

        /**
         * Destroys the account with username `username`
         *
         * @method destroy
         * @param {string} username The username of the account to be destroyed
         * @returns {Promise}
         * @memberOf tiwun.accounts.services.UserService
         */
        function destroy(username) {
            return $http.delete('/api/v1/users/' + username + '/');
        }


        /**
         * Gets the account with username `username`
         *
         * @method get
         * @param {string} username The username of the account to get
         * @returns {Promise}
         * @memberOf tiwun.accounts.services.UserService
         */
        function get(username) {
            return $http.get('/api/v1/users/' + username + '/');
        }


        /**
         * Update the account with username `username`
         *
         * @method update
         * @param {string} username The username of the account to be updated
         * @param {Object} account The updated account model
         * @returns {Promise}
         * @memberOf tiwun.accounts.services.UserService
         */
        function update(username, account) {
            return $http.put('/api/v1/users/' + username + '/', account);
        }
    }
})();
