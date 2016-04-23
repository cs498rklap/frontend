var postsControllers = angular.module('posts.controllers', []);

postsControllers.controller('PostsController', ['$scope', 'Posts', function($scope, Posts) {
	/* Variables used in this controller: */
	// Data:
	$scope.postsList = [];
	$scope.maxContentLength = 75;
	// Pagnation:
	$scope.pagesList = [];
	$scope.currentPage = 1;
	$scope.numPages = 1;
	$scope.maxPostsPerPage = 6;
	// Sorting:
	$scope.sortType = "timestamp";
	$scope.sortDirection = "-1";
	// Errors:
	$scope.showGetPostsError = false;
	$scope.errorMessage = "";
	$scope.showNoPostsWarning = false;
	$scope.warningMessage = "";

	/* Functions used in this controller: */
	// Load all posts according to the search and sort parameters
	$scope.loadPosts = function() {
		// Reset error messages
     	$scope.showGetPostsError = false;
     	$scope.showNoPostsWarning = false;

     	// First count the number of results and pages
     	Posts.get($scope.sortType, $scope.sortDirection, $scope.maxPostsPerPage, 0, true).success(function(data) {
     		var totalNumResults = data["data"];
	        var skip = 0;
	        if(totalNumResults == 0 || totalNumResults == undefined) {
	          $scope.numPages = 0;
	          $scope.currentPage = 0;
	        } else {
	          $scope.numPages = Math.ceil(totalNumResults / $scope.maxPostsPerPage);
	          skip = ($scope.currentPage-1)*$scope.maxPostsPerPage;
	        }
	        // Now get the results based on the current page
	        Posts.get($scope.sortType, $scope.sortDirection, $scope.maxPostsPerPage, skip, false).success(function(data) {
	        	$scope.postsList = data["data"];
	        	// Show the user a warning if no tasks were returned
				if($scope.postsList.length == 0) {
					$scope.warningMessage = "No posts with the given parameters were found.";
					$scope.showNoPostsWarning = true;
					$scope.updatePagesList(0, 0);
				}
				// Trim the length of the content shown to the user if it is too long
				else {
					$scope.postsList.forEach(function(post) {
						if(post.content.length > $scope.maxContentLength) {
							post.content = post.content.substring(0, $scope.maxContentLength);
							post.content += ". . .";
						}
					});
					$scope.updatePagesList(1, $scope.numPages);
				}
	        }).error(function(data) { // Error getting the results for this page
	        	$scope.errorMessage = data["message"];
        		$scope.showGetPostsError = true;
	        });
     	}).error(function(data) { // Error counting the number of results
     		$scope.errorMessage = data["message"];
        	$scope.showGetPostsError = true;
     	});

	};

	// Function to create the array containing the list of page numbers
	// Will just contain '0' if there are no results
	// Otherwise will contain '1', '2', ... 'X', where X is the last page number
	$scope.updatePagesList = function(startPage, endPage) {
		if(startPage == "0") {
			$scope.pagesList = ["0"];
		}
		else {
			$scope.pagesList = [];
			for(var index = startPage; index <= endPage; index++) {
				$scope.pagesList.push(index);
			}
		}
	};

	// Go to the next page
	$scope.nextPage = function() {
		if(($scope.currentPage + 1) > $scope.numPages) {
	      $scope.currentPage = 1;
	    }
	    else {
	      $scope.currentPage = $scope.currentPage + 1;
	    }
	    $scope.loadPosts();
	};

	// Go to the previous page
	$scope.previousPage = function() {
		if(($scope.currentPage - 1) <= 0) {
	      $scope.currentPage = $scope.numPages;
	    }
	    else {
	      $scope.currentPage = $scope.currentPage - 1;
	    }
	    $scope.loadPosts();
	};

	// Go to the page with the given number
	// If the given page is invalid, then stay on the current page
	$scope.goToPage = function(pageNumber) {
		if(pageNumber > 0 && pageNumber <= $scope.numPages) {
			$scope.currentPage = pageNumber;
			$scope.loadPosts();
		}
	};

	// Go to the lowest numbered page (usually 1, but 0 if there are no pages)
	$scope.goToFirstPage = function() {
		if($scope.numPages != "0") {
			$scope.goToPage(1);
		}
		else {
			$scope.goToPage(0);
		}
	};

	// Go to the highest numbered page
	$scope.goToLastPage = function() {
		$scope.goToPage($scope.numPages);
	};

	// Go back to page 1 and reload the tasks list
	$scope.resetPages = function() {
		$scope.currentPage = 1;
		$scope.loadPosts();
	};

	/* Code to run automatically on page load: */
	$scope.loadPosts();
}]);