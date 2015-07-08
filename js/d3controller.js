angular.module('app')
	.controller('JamieController', ['$scope', function($scope) {
	    $scope.onClick = function(item) {
	    	console.log('click registered');
	    	$scope.$apply(function() {
	    		if (!$scope.showDetailPanel)
	    			$scope.showDetailPanel = true;
	    		$scope.detailItem = item;
	    	});
	    };
	    $scope.update = function(user){
	    	$scope.data = [];
			$scope.data.push({metric:'debt',val: user.debt});
			$scope.data.push({metric:'income',val: user.income});
			console.log($scope.data);
			}
	    $scope.data = [
	    	{name:"Jim",val:0},
	    	{name:"John",val:0}
	    ];
	}])

	.controller('UserCtrl', ['$scope', function($scope) {
	$scope.master = {};
	$scope.update = function(user){
		$scope.master = angular.copy(user);
		console.log(user);
	}
	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	}
	$scope.reset();
}]);