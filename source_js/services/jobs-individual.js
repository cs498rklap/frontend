var jobServices = angular.module('job.services', []);
var baseUrl = "http://localhost:4000/api";

jobServices.factory('Jobs', function($http, $window) {
    return {
        getJob : function(Id) {
            return $http.get(baseUrl + '/jobs/' + Id);
        }
    }
});
