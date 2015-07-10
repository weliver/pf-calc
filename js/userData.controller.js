var app = angular.module('app');

app.controller('inputController', ['$scope', function($scope){
	$scope.data = [];
	$scope.update = function(data){
		var newData = {
 			label: data.label,
 			input: data.value
			}
		console.log(newData);
		$scope.data.push(angular.copy(newData));
	
		}

}] );