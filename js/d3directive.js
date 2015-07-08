angular.module('app', ['d3'])
	.directive('d3Bars', ['d3Service','$window', function(d3Service, $window){
	return {
		restrict: 'EA',
		scope: {
			data: '=', //bi-directional data-binding
			onClick: '&' //parent execution binding
		},
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3){

				var	margin = parseInt(attrs.margin) || 20,
    			    barHeight = parseInt(attrs.barHeight) || 20,
          			barPadding = parseInt(attrs.barPadding) || 5;

				var svg = d3.select(element[0])
							.append('svg')
							.style('width', '100%');

				//Browser onresize event
				window.onresize = function() {
					scope.$apply();
				};
				
							//Watch for resize event
				scope.$watch(function(){
					return angular.element($window)[0].innerWidth;
				}, function() {
					scope.render(scope.data);
				});

				//Watch for data changes and re-render
				scope.$watch('data', function(newVals, oldVals) {
					return scope.render(newVals);
				}, true);

				scope.render = function(data){
					var data = data;
					// var max = Math.max(data.debt,data.income);
					//remove all items before
					svg.selectAll('*').remove();
					if (!data) {
						console.log('no data found');
						return;
					}
					//variables
					var width = d3.select(element[0]).node().offsetWidth - margin;
						//let's calculate height
					var	height = data.length * (barHeight + barPadding);
						//fancy multicolor support
					var	color = d3.scale.category20();
						//xScale
					
					var	xScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d){
								return d.val;
							})])
							.range([0, width]);
					//set the height
					svg.attr('height', height || 100);

					//create the rectangles for the bar chart
					svg.selectAll('rect')
						.data(data).enter()
							.append('rect')
							.attr('width', 0)
							.attr('height', barHeight)
							.attr('x', Math.round(margin/2))
							.attr('y', function(d,i) {
								return i * (barHeight+barPadding);
							})
							.attr('fill', function(d) {return color(d.val);})
							.on('click', function(d, i) {
								return scope.onClick({item: d});
							})
							.transition()
								.duration(1000)
								.attr('width', function(d) {
									return xScale(d.val);
								});

				}
			});
		}
	};
}])
	.directive('d3Circle', ['d3Service','$window', function(d3Service, $window){
	return {
		restrict: 'EA',
		scope: {
			data: '=', //bi-directional data-binding
			onClick: '&' //parent execution binding
		},
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3){

				var	margin = parseInt(attrs.margin) || 20,
    			    circHeight = parseInt(attrs.circHeight) || 20,
          			circPadding = parseInt(attrs.circPadding) || 50;

				var svg = d3.select(element[0])
							.append('svg')
							.style('width', '100%');

				//Browser onresize event
				window.onresize = function() {
					scope.$apply();
				};
				
							//Watch for resize event
				scope.$watch(function(){
					return angular.element($window)[0].innerWidth;
				}, function() {
					scope.render(scope.data);
				});

				//Watch for data changes and re-render
				scope.$watch('data', function(newVals, oldVals) {
					return scope.render(newVals);
				}, true);

				scope.render = function(data){
					var data = data;
					// var max = Math.max(data.debt,data.income);
					//remove all items before
					svg.selectAll('*').remove();
					if (!data) {
						console.log('no data found');
						return;
					}
					//variables
					var width = d3.select(element[0]).node().offsetWidth - margin;
						//let's calculate height
					var	height = data.length * (circHeight + circPadding)*2;
						//fancy multicolor support
					var	color = d3.scale.category20();
						//xScale
					
					var	xScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d){
								return d.val*10;
							})])
							.range([0, width]);
					//set the height
					svg.attr('height', height || 100);

					//create the rectangles for the bar chart
					svg.selectAll('circle')
						.data(data).enter()
							.append('circle')
							// .attr('width', 0)
							.attr('r', 0)
							.attr('cx', Math.round(margin*2))
							.attr('cy', function(d,i) {
								return data.length + (circHeight+circPadding);
							})
							.attr('fill', function(d) {return color(d.val);})
							.on('click', function(d, i) {
								return scope.onClick({item: d});
							})
							.transition()
								.duration(1000)
								.attr('r', function(d) {
									return xScale(d.val);
								});

				}
			});
		}
	};
}]);

