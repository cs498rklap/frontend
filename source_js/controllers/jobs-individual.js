var jobControllers = angular.module('job.controllers', []);

jobControllers.controller('JobsIndividualController', ['$scope', '$http', 'Jobs', '$window', '$routeParams',  function($scope, $http, Jobs, $window, $routeParams) {
  $scope.job = {};
  $scope.timestamp = "";

  Jobs.getJob($routeParams.id).success(function(data) {
    $scope.job = data.data;
    $scope.timestamp = new Date($scope.job.deadline).toString();
  });
}]);
