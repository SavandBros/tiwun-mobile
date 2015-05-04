(function () {
    'use strict';

    angular.module('tiwun.account', [
        'tiwun.account.controllers.RegisterController',
        'tiwun.account.controllers.LoginController',
        'tiwun.account.controllers.AccountSettingsController',
        'tiwun.account.controllers.AccountController',
        'tiwun.account.controllers.UserProfileController',
        'tiwun.account.services.AuthenticationService',
        'tiwun.account.services.UserService'
    ]);

    angular.module('tiwun.account.controllers.RegisterController', []);
    angular.module('tiwun.account.controllers.LoginController', []);
    angular.module('tiwun.account.controllers.AccountSettingsController', []);
    angular.module('tiwun.account.controllers.AccountController', []);
    angular.module('tiwun.account.controllers.UserProfileController', []);
    angular.module('tiwun.account.services.AuthenticationService', ['ngCookies']);
    angular.module('tiwun.account.services.UserService', []);

})();
