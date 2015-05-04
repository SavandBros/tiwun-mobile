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
                var TagService = {
                    all: all
                };

                return TagService;

            function all(page_number) {
                return $http.get(
                        'https://127.0.0.1:8000/api/tags/',
                        {params: {page: page_number}}
                );
            }

            function tagDetail(page_number, tagSlug) {
                return $http.get(
                        'https://127.0.0.1:8000/api/tags/'+tagSlug+'/',
                        {params: {page: page_number}}
                );
            }
        }

})();
