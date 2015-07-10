angular.module('app')
	.controller('JamieController', ['$scope', function($scope) {
	    // $scope.onClick = function(item) {
	    // 	console.log('click registered');
	    // 	$scope.$apply(function() {
	    // 		if (!$scope.showDetailPanel)
	    // 			$scope.showDetailPanel = true;
	    // 		$scope.detailItem = item;
	    // 	});
	    // };
	    $scope.update = function(user){
	    	$scope.data = [];
			$scope.data.push({label:'income',value: user.income});
			$scope.data.push({label:'debt',value: user.debt});
			console.log($scope.data);
			}
	    $scope.data = [
	    	{label:"Jim",value:500},
	    	{label:"John",value:499}
	    ];
	    $scope.accessor = function(d){ return d.value;};
	    $scope.labels = function(d) { return d.label;};
		$scope.add = function(){ 
    	$scope.data.push({ label: 'Victor', value: 100 })
  		};
  		$scope.remove = function(datum){
    	$scope.data.splice(this.$index, 1);
  			};
		}]);

	// .controller('UserCtrl', ['$scope', function($scope) {
	// $scope.master = {};
	// $scope.update = function(user){
	// 	$scope.master = angular.copy(user);
	// 	console.log(user);
	// }
	// $scope.reset = function() {
	// 	$scope.user = angular.copy($scope.master);
	// }
	// $scope.reset();
// });