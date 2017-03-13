var app = angular.module('myapp', []);
app.controller('mainController', function ($scope, $http) {
    
    $http.get('/employees')
        .then(function(response) {
            $scope.employees = response.data;
    });

    $scope.postItems = function(form){
            console.log(form.e.employeeNumber);
            $http.post('/updateEmployee', form.e).then(function(data){
            });
        };
        
});
