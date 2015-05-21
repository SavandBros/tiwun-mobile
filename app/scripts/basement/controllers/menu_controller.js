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
        ar: 'العربية',
        ca: 'Català',
        da: 'dansk',
        de: 'Deutsch',
        en: 'English',
        fa: 'فارسی',
        fr: 'Français',
        hi: 'हिंदी',
        it: 'Italiano',
        ja: '日本語',
        pt: 'Português',
        ru: 'русский',
        sv: 'Svenska',
        th: 'ไทย',
        tr: 'Türkçe',
        ur: 'اردو'
    };

    $scope.$on('tiwun.account.service.AuthenticationService:SignedOut', function() {
        $window.location.reload(true)
    });

    /**changeTranslation
     *
     * Change app translation.
     *
     * @method changeTranslation
     * @param {Object} translation
     * @memberOf tiwun.basement.controllers.MenuController
     */
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
