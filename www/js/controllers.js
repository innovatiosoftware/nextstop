//Retrieve from device
var lat = 18.248151;
var long = -66.079051;
var baseUrl = "http://localhost:8002/";


angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.destinations = Chats.destinations();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, $http) {
        $scope.destination = {};

        var busStopId = parseInt($stateParams.chatId) + 1;
        var index = $stateParams.chatId;
        $http({method: 'GET', url: baseUrl + 'getNearBusInfo/' + lat + '/' + long + '/' + busStopId })
            .success(function (data, status, headers, config) {
                console.log({destination: Chats.destinations()[index], nearbyInfo: {time: data.time, distance: data.distance}});
                $scope.destination = {destination: Chats.destinations()[index], nearbyInfo: {time: data.time, distance: data.distance}};
            })
            .error(function (data, status, headers, config) {
                console.log(status || ":" || data || "Request getNearBusInfo failed");
            });
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
