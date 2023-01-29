const myApp = angular.module('myApp', ['ngRoute'])

myApp.config(['$routeProvider', ($routeProvider)=> {

    $routeProvider
        .when('/home', {
            templateUrl : 'views/home.html',
            controller : 'userDataController'
        })
        .when('/directory', {
            templateUrl : 'views/directory.html',
            controller : 'userDataController'
        })
        .otherwise({
            redirectTo : '/home'
    })
}]);

myApp.directive('randomUser', [function(){
    return {
        restrict : 'E',
        scope : {
            users : '=',
            title : '='
        },
        templateUrl : 'views/random.html',
        transclude: true,
        controller : function($scope){
            $scope.random = Math.floor(Math.random() * 4)
        }

    };
}]);

myApp.controller('userDataController', ['$scope', '$http', function($scope, $http) {

    $scope.addUser = ()=> {
        $scope.users.push({
           name : $scope.newuser.name,
           price : parseInt($scope.newuser.price),
           skills : $scope.newuser.skills,
           available : true,
        });
        $scope.newuser.name = "";
        $scope.newuser.price = "";
        $scope.newuser.skills = "";
    };

    $http.get('./data/users.json').then(successCallback, errorCallback);

        function successCallback(response){
            $scope.users = response.data;
        }
        function errorCallback(error){
            //error code
            console.log('error fetching data')
        }

}]);







