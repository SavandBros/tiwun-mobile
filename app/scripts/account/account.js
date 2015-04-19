(function () {
  'use strict';

  angular.module('tiwun.account', [
    'tiwun.account.controllers',
    'tiwun.account.services'
  ]);

  angular.module('tiwun.account.controllers', []);
  angular.module('tiwun.account.services', ['ngCookies']);

})();
