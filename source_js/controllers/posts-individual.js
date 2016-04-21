var postControllers = angular.module('post.controllers', []);

postControllers.controller('PostIndividualController', ['$scope', '$routeParams', 'PostIndividual', function($scope, $routeParams, PostIndividual) {
    $scope.newComment = '';
    $scope.edit = [];

    $scope.getPost = function(id) {
        PostIndividual.get(id).then(function(response) {
            $scope.post = response.data.data;
            $scope.setEditArray();
        }, function(error) {
            $scope.error = error.data.message;
        });
    };

    $scope.addComment = function() {
        if ($scope.newComment.length === 0) {
            $scope.error = "Please enter comment text.";
        } else {
            var comment = {
                username: 'testUser',
                text: $scope.newComment,
                timestamp: Date.now()
            };
            var params = {
                '$push': { comments: comment }
            };
            PostIndividual.update($scope.post._id, params).then(function(response) {
                $scope.error = '';
                $scope.post.comments = response.data.data.comments;
            }, function(error) {
                $scope.error = error.message;
            });
        }
    };

    $scope.deleteComment = function(comment) {
        var params = {
            '$pull': { comments: {'_id': comment._id }}
        };
        PostIndividual.update($scope.post._id, params).then(function(response) {
            $scope.error = '';
            $scope.post.comments = $scope.post.comments.filter(function(obj) {
                return obj._id !== comment._id;
            });
            $scope.setEditArray();
        }, function(error) {
            $scope.error = error.message;
        });
    };

    $scope.updateComment = function(comment, index) {
        var params = {
            'cid': comment._id,
            'ctext': comment.text
        };
        PostIndividual.update($scope.post._id, params).then(function(response) {
            $scope.error = '';
            $scope.post.comments = response.data.data.comments;
            $scope.edit[index] = false;
        }, function(error) {
            $scope.error = error.message;
        });
    };

    $scope.setEditArray = function() {
        $scope.edit = Array.apply(null, Array($scope.post.comments.length)).map(function() { return false; });
    };

    $scope.initialize = function() {
        if ($routeParams.id) {
            $scope.getPost($routeParams.id);
        } else {
            $scope.error = "No Post Found";
        }
    };
}]);