/**
 * UserService
 * @namespace tiwun.accounts.services
 */
(function () {
    'use strict';

    angular.module('tiwun.account.services.UserService')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    /**
     * @namespace UserService
     */
    function UserService($http) {
        /**
         * @name UserService
         * @desc The factory to be returned
         * @memberOf tiwun.accounts.services.UserService
         */
        var UserService = {
            destroy: destroy,
            get: get,
            update: update
        };

        return UserService;

        /**
         * @name destroy
         * @desc Destroys the account with username `username`
         * @param {string} username The username of the account to be destroyed
         * @returns {Promise}
         * @memberOf tiwun.accounts.services.UserService
         */
        function destroy(username) {
            return $http.delete('/api/v1/users/' + username + '/');
        }


        /**
         * @name get
         * @desc Gets the account with username `username`
         * @param {string} username The username of the account to get
         * @returns {Promise}
         * @memberOf tiwun.accounts.services.UserService
         */
        function get(username) {
            return $http.get('/api/v1/users/' + username + '/');
        }


        /**
         * @name update
         * @desc Update the account with username `username`
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
