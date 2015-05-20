/*global angular*/
'use strict';



angular.module('tiwun.item', [
    'tiwun.item.controllers.ItemsControllers',
    'tiwun.item.controllers.NewItemController',
    'tiwun.item.controllers.SingleItemController',
    'tiwun.item.services.ItemService'
]);

angular.module('tiwun.item.controllers.ItemsControllers', []);
angular.module('tiwun.item.controllers.NewItemController', []);
angular.module('tiwun.item.controllers.SingleItemController', []);
angular.module('tiwun.item.services.ItemService', []);
