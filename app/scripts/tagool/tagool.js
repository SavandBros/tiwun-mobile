(function() {
    'use strict';

    angular.module('tiwun.tagool', [
        'tiwun.tagool.controllers.TagsController',
        'tiwun.tagool.controllers.TagsDetailController',
        'tiwun.tagool.services.TagService'
    ]);

    angular.module('tiwun.tagool.controllers.TagsController', []);
    angular.module('tiwun.tagool.controllers.TagsDetailController', []);
    angular.module('tiwun.tagool.services.TagService', []);
})();
