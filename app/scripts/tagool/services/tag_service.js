/**
 * TagService
 * @class TagService
 * @namespace tiwun.tagool.services
 */
(function () {
    'use strict';

    angular.module('tiwun.tagool.services.TagService', [])
        .factory('TagService', TagService);

    TagService.$inject = ['$http'];

    function TagService($http) {
        var TagService = {};

        return TagService;
    }
})();
