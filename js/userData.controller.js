var app = angular.module('app');

app.controller('inputController', ['$timeout','$scope', function($timeout, $scope){
	$scope.data = [
	{label:'Sample Label', value:'50,000'}
	];
	$scope.update = function(data){
		var newData = {
 			label: data.label,
 			value: data.value
			}
		$scope.data.push(angular.copy(newData));
		$timeout(function() {
						$scope.$apply();
					});
		}
	$scope.remove = function(input) {
		var index = $scope.data.indexOf(input);
		$scope.data.splice(index, 1);
		}	
  	
}] );