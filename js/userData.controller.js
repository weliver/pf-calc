var app = angular.module('app');

app.controller('inputController', ['$timeout','$scope','userInputService', function($timeout, $scope, userInputService){
	$scope.data = userInputService.data;
	$scope.tester = function(){
		console.log('clicked it!');
	}
	$scope.update = function(data){
		console.log('update called');
		var newData = {
 			label: data.label,
 			value: data.value
			}
		$userInputService.push(angular.copy(newData));
		$timeout(function() {
						$scope.$apply();
					});
		};

	$scope.remove = function(input) {
		var index = $scope.data.indexOf(input);
		$scope.data.splice(index, 1);
		}	
  	
}] );

app.controller('graphController', ['$scope', 'userInputService', function($scope, userInputService) {

	$scope.data = userInputService.data;

}]);