/*global angular*/
'use strict';

/**
 * NewItemController
 *
 * @class NewItemController
 * @namespace tiwun.item.controllers.NewItemController
 */
function NewItemController($scope, $state, $ionicHistory, $log, AuthenticationService, ItemService, MoneyCurrencyService, ToastService) {
    $scope.auth = AuthenticationService;
    $scope.moneyCurrencies = MoneyCurrencyService.currencyFormats();
    /*global angular*/
    'use strict';
    $scope.item = {
        minPrice: 0,
        maxPrice: 0,
        discountedPrice: 0
    };

    function constructor() {
        if (!AuthenticationService.isAuthenticated()) {
            $state.go('app.login');
        }
    }

    constructor();

    /**
     * create
     * Create a new Item
     *
     * @memberOf tiwun.item.controllers.NewItemController
     */
    $scope.create = function(form, item) {
        $scope.formSubmitted = true;

        if (form.$valid) {
            var payload = {
                title: item.title,
                description: item.description,
            };

            // Turn tags to a list
            payload.tags = item.tags.split(' ');

            if (!item.isFree) {

                payload.min_price = item.minPrice;
                payload.max_price = item.maxPrice;
                payload.compare_at_price = item.discountedPrice;
                payload.currency = item.moneyCurrency;

            } else {

                payload.min_price = 0;
                payload.max_price = 0;
                payload.compare_at_price = 0;
                payload.currency = " ";
            }

            $log.debug(payload);

            ItemService.create(payload).then(
                function(data, status, headers, config) {
                    $state.go('app.singleItem', {
                        itemId: data.data.data.id
                    });
                },
                function(data, status, headers, config) {
                    $log.error('Error happened on creating new item: ' + data.error);
                }
            )
        }
    };

    /**
     * cancel
     * Cancel creation of new item and go back!
     *
     * @memberOf tiwun.item.controllers.NewItemController
     */
    $scope.cancel = function() {
        $ionicHistory.goBack();
    }
}


angular.module('tiwun.item.controllers.NewItemController', [
    'tiwun.item.services.ItemService',
    'tiwun.account.services.AuthenticationService',
    'tiwun.basement.services.MoneyCurrencyService',
    'tiwun.basement.services.ToastService'
]).controller('NewItemController', NewItemController);

NewItemController.$inject = [
    '$scope',
    '$state',
    '$ionicHistory',
    '$log',
    'AuthenticationService',
    'ItemService',
    'MoneyCurrencyService',
    'ToastService'
];
