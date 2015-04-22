(function () {
    'use strict';

    angular.module('tiwun.item', [
        'tiwun.item.controllers',
        'tiwun.item.directives',
        'tiwun.item.services'
    ]);

    angular.module('tiwun.item.controllers', []);
    angular.module('tiwun.item.directives', ['ngDialog']);
})();

