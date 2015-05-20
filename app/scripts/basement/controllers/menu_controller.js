/*global angular*/
'use strict';

/**
 * MenuController
 *
 * @class MenuController
 * @namespace tiwun.basement.controllers.MenuController
 * @param {Object} $window
 * @param {Object} $scope
 * @param {Object} gettextCatalog
 * @param {AuthenticationService} AuthenticationService
 */
function MenuController($window, $scope, gettextCatalog, AuthenticationService) {
    $scope.auth = AuthenticationService;
    $scope.user = AuthenticationService.getAuthenticatedUser();
    $scope.defaultTranslation = $window.localStorage.getItem('translation');

    $scope.translations = {
        ar: gettextCatalog.getString('Arabic'),
        ca: gettextCatalog.getString('Catalan'),
        da: gettextCatalog.getString('Danish'),
        de: gettextCatalog.getString('German'),
        en: gettextCatalog.getString('English'),
        fa: gettextCatalog.getString('Persian'),
        fr: gettextCatalog.getString('French'),
        hi: gettextCatalog.getString('Hindi'),
        it: gettextCatalog.getString('Italian'),
        ja: gettextCatalog.getString('Japanese'),
        pt: gettextCatalog.getString('Portuguese'),
        ru: gettextCatalog.getString('Russian'),
        sv: gettextCatalog.getString('Swedish'),
        th: gettextCatalog.getString('Thai'),
        tr: gettextCatalog.getString('Turkish'),
        ur: gettextCatalog.getString('Urdu')
    };

    $scope.$on('tiwun.account.service.AuthenticationService:SignedOut', function() {
        $window.location.reload(true)
    });

    $scope.changeTranslation = function(translation) {
        gettextCatalog.setCurrentLanguage(translation.selected);
        $window.localStorage.setItem('translation', translation.selected);
        $scope.defaultTranslation = translation.selected;

    }
}

angular.module('tiwun.basement.controllers.MenuController', [
        'tiwun.account.services.AuthenticationService'
    ])
    .controller('MenuController', MenuController);

MenuController.$inject = ['$window', '$scope', 'gettextCatalog', 'AuthenticationService'];
