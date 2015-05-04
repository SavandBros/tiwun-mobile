(function () {
    "use strict";

    angular.module('tiwun.basement', [
        'tiwun.basement.controllers.IndexController',
        'tiwun.basement.controllers.NavbarController',
        'tiwun.basement.controllers.MenuController',
        'tiwun.basement.services.PaginationService',
        'tiwun.basement.filters.timesinceFilter'
    ]);


    angular.module('tiwun.basement.controllers.IndexController', []);
    angular.module('tiwun.basement.controllers.NavbarController', []);
    angular.module('tiwun.basement.controllers.MenuController', []);
    angular.module('tiwun.basement.services.PaginationService', []);
    angular.module('tiwun.basement.filters.timesinceFilter', []);
})();
