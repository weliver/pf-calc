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

				var	margin = parseInt(attrs.margin) || 10,
    			    barHeight = parseInt(attrs.barHeight) || 25,
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
								return d.value;
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
							.attr('x', Math.round(margin)/2)
							.attr('y', function(d,i) {
								return i* (barHeight+barPadding);
							})
							.attr('fill', function(d) {return color(d.value);})
							.on('click', function(d, i) {
								return scope.onClick({item: d});
							})
							.transition()
								.duration(1000)
								.attr('width', function(d) {
									return xScale(d.value);
								});

				}
			});
		}
	};
}])
	.directive('donutChart', ['d3Service', '$window', function(d3Service, $window){
		return {
			restrict: 'E',
			scope: {
				data: '=',
				onClick: '&',
				accessor: '=',
				labels: '='
			},
			link: link
			};
		function link(scope, element) {
			d3Service.d3().then(function(d3) {
				console.log('scope.data', scope.data);
				var color = d3.scale.category10();
				var el = element[0];
				var width = el.clientWidth;
				var height = el.clientHeight;
				console.log(width);
				var min = Math.min(width, height);
				var accessor = scope.accessor || Number;
				var labels = scope.labels;
				var pie = d3.layout.pie().sort(null).value(accessor);
				var arc = d3.svg.arc()
					      .outerRadius(min / 2 * 0.9)
					      .innerRadius(min / 2 * 0.5);
				var svg = d3.select(el).append('svg')
							.attr({width: '100%', height: '100%'})
							.append('g')
								.attr('transform', 'translate(' + width / 2 + ',' + height /2 + ')');
				svg.on('mousedown', function(d) {
					scope.$apply(function(){
						if(scope.onClick) scope.onClick();
					});
				});

				// Store the displayed angles in _current.
				// Then, interpolate from _current to the new angles.
				// During the transition, _current is updated in-place by d3.interpolate.
				function arcTween(a) {
					console.log('a is:');
					console.log(a);
					console.log(this._current);
					var i = d3.interpolate(this._current, a);
					this._current = i(0);
					console.log(i(0));
					return function(t) {
						return arc(i(t));
					};
				}
				

				var arcs = svg.selectAll('path.arc').data(pie(scope.data))
				    .enter().append('path')
				    .attr('class', 'arc')
				    .style('stroke', 'white')
				    .attr('fill', function(d, i) { return color(i) })
				    // store the initial angles
				    .each(function(d) { return this._current = d });

				scope.$watch('data', function(newData, oldData) {
					console.log('data changed, rendering new chart');
					// var data = newData.map(function(x,y,z){
					// 			return x.val;
					// });
					var data = newData.slice(0);
					console.log('newData is:')
					console.log(data);
					var duration = 500;
					var PI = Math.PI;
					while(data.length < oldData.length) data.push(0);
					arcs = svg.selectAll('.arc').data(pie(newData));

					arcs.transition().duration(duration).attrTween('d', arcTween);
					arcs.enter().append('path')
						.style('stroke', 'white')
						.attr('class', 'arc')
						.attr('fill', function(d, i ) {return color(i)})
						.each(function(d) {
							this._current = { startAngle: 6, endAngle: 6 } })
						.transition().duration(duration).attrTween('d', arcTween);
					arcs.filter(function(d) {return d.data === 0})
						.transition()
						.duration(duration)
						.each(function(d){ d.startAngle = 2 * PI - 0.001; d.endAngle = 2 * PI; })
						.attrTween('d', arcTween).remove();
						}, true);
					

				}
			);
		}
	}]);

// 	.directive('d3Circle', ['d3Service','$window', function(d3Service, $window){
// 	return {
// 		restrict: 'EA',
// 		scope: {
// 			data: '=', //bi-directional data-binding
// 			onClick: '&' //parent execution binding
// 		},
// 		link: function(scope, element, attrs) {
// 			d3Service.d3().then(function(d3){

// 				var	margin = parseInt(attrs.margin) || 20,
//     			    circHeight = parseInt(attrs.circHeight) || 20,
//           			circPadding = parseInt(attrs.circPadding) || 40;

// 				var svg = d3.select(element[0])
// 							.append('svg')
// 							.style('width', '100%');

// 				//Browser onresize event
// 				window.onresize = function() {
// 					scope.$apply();
// 				};
				
// 							//Watch for resize event
// 				scope.$watch(function(){
// 					return angular.element($window)[0].innerWidth;
// 				}, function() {
// 					scope.render(scope.data);
// 				});

// 				//Watch for data changes and re-render
// 				scope.$watch('data', function(newVals, oldVals) {
// 					return scope.render(newVals);
// 				}, true);

// 				var circle = {
// 					polarToCartesian: function(centerX, centerY, radius, angleInDegrees) {
//     					var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
// 						   return {
// 						    x: centerX + (radius * Math.cos(angleInRadians)),
// 						    y: centerY + (radius * Math.sin(angleInRadians))
// 						   };
// 					},

// 					describeArc: function (x, y, radius, startAngle, endAngle){
// 						var start = circle.polarToCartesian(x, y, radius, endAngle);
// 						var end = circle.polarToCartesian(x, y, radius, startAngle);
// 						var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

// 						var d = [
// 						    "M", start.x,start.y , 
// 						    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
// 						    // "L", x,y,
// 						    // "L", start.x, start.y						
// 						    ].join(" ");
// 						   return d;       
// 					}

// 				}
// 				scope.render = function(data){
// 					var data = data;
// 					var circD;
// 					var circleRatio = function(data){
// 						var a = Math.max(data[0].val,data[1].val);
// 						var b = Math.min(data[0].val,data[1].val);
// 						console.log('b is '+b);
// 						if (b>0){ 
// 							var c = (b/a)*360-.01;
// 							console.log('c is '+c);
// 							circD = c;
// 						} else circD = 0;
// 					};
// 					circleRatio(data);

// 					//remove all items before
// 					svg.selectAll('*').remove();
// 					if (!data) {
// 						console.log('no data found');
// 						return;
// 					}
// 					//variables
// 					var width = d3.select(element[0]).node().offsetWidth;
// 						//let's calculate height
// 					var	height = data.length * (circHeight + circPadding)*2;
// 						//fancy multicolor support
// 					var	color = d3.scale.category20();
// 						//xScale
					
// 					var	xScale = d3.scale.linear()
// 							.domain([0, d3.max(data, function(d){
// 								return d.val;
// 							})])
// 							.range([0, 360]);
// 					//set the height
// 					svg.attr('height', height || 100);

// 					//create the circle for path for the bar chart
// 					svg.selectAll('circle')
// 						.data(data).enter()
// 							.append('circle')
// 							.attr('cx', width/2)
// 							.attr('cy', height/2)
// 							.attr('r', 0)
// 							.attr('fill', 'white')
// 							.transition()
// 								.duration(1000)
// 								.attr('fill', function(d){
// 								if (d.val>0) {
// 									return '#f6f6f6';
// 								} else {
// 									return 'none';
// 								}})
// 								.attr('r', 100);
							
// 					svg.selectAll('path')
// 						.data(data).enter()
// 							.append('path')
// 							// .attr('width', 0)
// 							.attr('d', function(d) {return circle.describeArc(width/2, height/2, 100, 0, xScale(d.val));})
// 							.attr('stroke-width', 0)
// 							.attr('stroke', 'white')
// 							.attr('fill', 'none')
// 							// .attr('cx', Math.round(margin*2))
// 							// .attr('cy', function(d,i) {
// 							// 	return data.length + (circHeight+circPadding);
// 							// })
// 							.on('click', function(d, i) {
// 								return scope.onClick({item: d});
// 							})
// 							.transition()
// 								.duration(1000)
// 								.attr('stroke', '#ffae19')
// 								.attr('stroke-width', 22)
// 								.attr('stroke-width', 20);
								

// 				}
// 			});
// 		}
// 	};
// }]);

