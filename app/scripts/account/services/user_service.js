/**
 * User Service
 *
 * @class UserService
 * @namespace tiwun.account.services.UserService
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
         * @memberOf tiwun.account.services.UserService
         */
        function get(user_id) {
            return $http.get('https://127.0.0.1:8000/api/users/' + user_id + '/');
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
            return $http.put('https://127.0.0.1:8000/api/users/' + user.pk + '/', user);
        }
    }
})();
