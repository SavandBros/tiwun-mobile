/*global angular*/
'use strict';

/**
 * `tiwun.account` module.
 *
 * @module tiwun.account
 */
angular.module('tiwun.account', [
    'tiwun.account.controllers.RegisterController',
    'tiwun.account.controllers.LoginController',
    'tiwun.account.controllers.UserSettingsController',
    'tiwun.account.controllers.UserProfileController',
    'tiwun.account.services.AuthenticationService',
    'tiwun.account.services.UserService'
]);

angular.module('tiwun.account.controllers.RegisterController', []);
angular.module('tiwun.account.controllers.LoginController', []);
angular.module('tiwun.account.controllers.UserSettingsController', []);
angular.module('tiwun.account.controllers.AccountController', []);
angular.module('tiwun.account.controllers.UserProfileController', []);
angular.module('tiwun.account.services.AuthenticationService', ['ngCookies']);
angular.module('tiwun.account.services.UserService', []);

