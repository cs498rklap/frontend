var postControllers = angular.module('post.controllers', []);

postControllers.controller('PostIndividualController', ['$scope', '$routeParams', 'PostIndividual', function($scope, $routeParams, PostIndividual) {
    $scope.getPost = function(id) {
        PostIndividual.get(id).then(function(response) {
            $scope.post = response.data.data;
        }, function(error) {
            $scope.error = error.data.message;
        });
    };

    $scope.initialize = function() {
        if ($routeParams.id) {
            $scope.getPost($routeParams.id);
        } else {
            $scope.error = "No Post Found";
        }
    };
}]);