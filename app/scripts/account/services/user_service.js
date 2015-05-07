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
            get: get,
            update: update
        };

        return UserService;

        /**
         * Gets the account with username `username`
         *
         * @method get
         * @param {string} user_id The user's ID to get.
         * @returns {Promise}
         * @memberOf tiwun.accounts.services.UserService
         */
        function get(user_id) {
            return $http.get('https://127.0.0.1:8000/api/users/' + user_id + '/');
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
