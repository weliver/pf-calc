
// angular.module('app', ['d3'])
// 	.directive('donutChart', ['d3Service', '$window', function(d3Service, $window){
// 		return {
// 			restrict: 'E',
// 			scope: {
// 				data: '=',
// 				onClick: '&',
// 				accessor: '='
// 			},
// 			link: link
// 			};
// 		function link(scope, element) {
// 			d3Service.d3().then(function(d3) {
// 				console.log('scope.data', scope.data);
// 				var color = d3.scale.category10();
// 				var el = element[0];
// 				var width = el.clientWidth;
// 				var height = el.clientHeight;
// 				console.log(width);
// 				var min = Math.min(width, height);
// 				var accessor = scope.accessor || Number;
// 				console.log('accessor is ');
// 				console.log(accessor);
// 				var pie = d3.layout.pie().sort(null).value(accessor);
// 				var arc = d3.svg.arc()
// 					      .outerRadius(min / 2 * 0.9)
// 					      .innerRadius(min / 2 * 0.5);
// 				var svg = d3.select(el).append('svg')
// 							.attr({width: '100%', height: '100%'})
// 							.append('g')
// 								.attr('transform', 'translate(' + width / 2 + ',' + height /2 + ')');
// 				svg.on('mousedown', function(d) {
// 					scope.$apply(function(){
// 						if(scope.onClick) scope.onClick();
// 					});
// 				});

// 				// Store the displayed angles in _current.
// 				// Then, interpolate from _current to the new angles.
// 				// During the transition, _current is updated in-place by d3.interpolate.
// 				function arcTween(a) {
// 					console.log('a is:');
// 					console.log(a);
// 					console.log(this._current);
// 					var i = d3.interpolate(this._current, a);
// 					this._current = i(0);
// 					console.log(i(0));
// 					return function(t) {
// 						return arc(i(t));
// 					};
// 				}
				

// 				var arcs = svg.selectAll('path.arc').data(pie(scope.data))
// 				    .enter().append('path')
// 				    .attr('class', 'arc')
// 				    .style('stroke', 'white')
// 				    .attr('fill', function(d, i) { return color(i) })
// 				    // store the initial angles
// 				    .each(function(d) { return this._current = d });

// 				scope.$watch('data', function(newData, oldData) {
// 					console.log('data changed, rendering new chart');
// 					// var data = newData.map(function(x,y,z){
// 					// 			return x.val;
// 					// });
// 					var data = newData.slice(0);
// 					console.log('newData is:')
// 					console.log(data);
// 					var duration = 500;
// 					var PI = Math.PI;
// 					console.log('PI is:');
// 					console.log(PI);
// 					while(data.length < oldData.length) data.push(0);
// 					arcs = svg.selectAll('.arc').data(pie(newData));

// 					arcs.transition().duration(duration).attrTween('d', arcTween);
// 					arcs.enter().append('path')
// 						.style('stroke', 'white')
// 						.attr('class', 'arc')
// 						.attr('fill', function(d, i ) {return color(i)})
// 						.each(function(d) {
// 							this._current = { startAngle: 6, endAngle: 6 } })
// 							.transition().duration(duration).attrTween('d', arcTween);
// 					arcs.filter(function(d) {return d.data === 0})
// 						.transition()
// 						.duration(duration)
// 						.each(function(d){ d.startAngle = 2 * PI - 0.001; d.endAngle = 2 * PI; })
// 						.attrTween('d', arcTween).remove();
// 						}, true);
					

// 				}
// 			);
// 		}
// 	}]);