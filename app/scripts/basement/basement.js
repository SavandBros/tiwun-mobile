/*global angular*/
'use strict';

/**
 * `tiwun.basement` module.
 *
 * @module tiwun.account
 */
angular.module('tiwun.basement', [
    'tiwun.basement.services.PaginationService',
    'tiwun.basement.services.ToastService',
    'tiwun.basement.controllers.IndexController',
    'tiwun.basement.controllers.NavbarController',
    'tiwun.basement.controllers.MenuController',
    'tiwun.basement.filters.timesinceFilter',
    'tiwun.basement.translations'
]);


angular.module('tiwun.basement.services.PaginationService', []);
angular.module('tiwun.basement.services.ToastService', []);
angular.module('tiwun.basement.controllers.IndexController', []);
angular.module('tiwun.basement.controllers.NavbarController', []);
angular.module('tiwun.basement.controllers.MenuController', []);
angular.module('tiwun.basement.filters.timesinceFilter', []);
angular.module('tiwun.basement.translations', []);
