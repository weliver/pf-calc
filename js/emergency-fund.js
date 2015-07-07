
/*Emergency Fund Calculator*/
function storeUser(title, item){
	localStorage.setItem(title, JSON.stringify(item));
}



$(function(){
	var user = {};
	$('#expenses').on('blur change', function(){
		var $userExpenses = $('#expenses').val();
		if (/^\$?\d+\,?\d+\.?\d{1}?$/.test($userExpenses)){
			$('#expenses').removeClass('invalid');
			$('#expensesfeedback').text('');
			user.expenses = $userExpenses;
			storeUser("expenses",user.expenses);
		} else {
			$('#expensesfeedback').text('Please enter your expenses');
			$('#expenses').addClass('invalid');
			user.expenses=null;
				}	
	});
	$('#savings').on('blur change', function(){
		var $userSavings = $('#savings').val();
		if (/^\$?\d?\,?\d+\.?\d?$/.test($userSavings)){
			$('#savings').removeClass('invalid');
			$('#savingsfeedback').text('');
			user.savings = $userSavings;
		} else if ($.isNumeric($userSavings)){
			$('#savings').removeClass('invalid').text('');
			$('#savingsfeedback').text('');
			user.savings = $userSavings;
		} else {
			$('#savings').text('Please enter your savings');
			$('#savings').addClass('invalid');
			user.savings=null;
		}
		storeUser("savings",user.savings);
	});

	$('#efInput').on('submit', function(e){
		e.preventDefault();
		var getAnswer = function (){
			var choice = $('input[name=radio]:checked').val();
			var answer = choice;
			user.answer = answer;
			return answer;
			}
		storeUser("Response:",getAnswer());
		var emergSavings;
		var answer = "a"+user.answer;
		var userExpenses = parseInt(user.expenses);
		var userSavings = parseInt(user.savings);
		console.log(userExpenses);
		var calcSavings = function(){
			if (answer == "a1"){
				user.emergTime = 3;
				emergSavings = (userExpenses*3);
				user.emergSavings = emergSavings;
				emergSavingsGoal = emergSavings-userSavings;
				return emergSavingsGoal;
			}
			else if (answer == "a2"){
				user.emergTime = 6;
				emergSavings = (userExpenses*6);
				user.emergSavings = emergSavings;
				emergSavingsGoal = emergSavings-userSavings;
				return emergSavingsGoal;	
		}
			else if (answer == "a3"){
				user.emergTime = 9;
				emergSavings = (userExpenses*9);
				user.emergSavings = emergSavings;
				emergSavingsGoal = emergSavings-userSavings;
				return emergSavingsGoal;	
		}
			else (answer == "a4")
				user.emergTime = 12;
				emergSavings = (userExpenses*12);
				user.emergSavings = emergSavings;
				emergSavingsGoal = emergSavings-userSavings;
				return emergSavingsGoal;
		}
		var total = calcSavings();
		var userTime = user.emergTime;
		var userTarget = (userTime*userExpenses);
		var userProgress = user.emergSavings;
		var printGoal = function () {
		$('#efund').text('');
		if (total>0)
		$('#efund').append('<p>You should save enough to cover expenses for <span>'+userTime+'</span> months: <span>$'+userTarget+'</span>.</p> <p>This means you need to save an additional <span>$'+total+'</span> to get you there.</p>');
		else
			$('#efund').append('<p>Nice! Your savings of <span>$'+userSavings+'</span> should keep you covered for '+userTime+' months.</p>')
		storeUser("Fund Goal:", total);
		}
		var checkInputs = function (){
			this.userExpenses = user.expenses;
			this.userSavings = user.savings;
			if ((userExpenses) && (userSavings>-1)){
				printGoal();
				$('#submiterror').text('');
			}
			else
				$('#submiterror').text('Please fill out your savings and expenses.');
		}
		checkInputs();
			
	});
});

/*Draw the chart of user's savings vs. debt*/
function drawSVG(data) {
	var userSavings = parseInt(user.savings);
	var userTotal = parseInt(user.emergSavings);
	console.log(userSavings, userTotal);
	var userInfo = [
	[userSavings],
	[userTotal]
	];
	
	var circle = d3.select('svg')
		.selectAll("circle")
		.data(userInfo);

	// circle
	// 	.enter()
	// 	.append("circle")
	// 	.attr('cx', 50)
	// 	.attr('cy', function (d) {return (d.key <1 ? 50 : (((1000/d.val)*160)+50));})
	// 	.attr('r', function (d) {return (1000/d.val)*160;})
	// 	.style('fill', function (d) {return (d.key < 1 ? "green":"yellow"); });
	var chart1 = document.getElementById("chart1");

	var w = 500;
	var h = 150;

	var xScale = d3.scale.linear()
		.domain([0, d3.max(userInfo, function(d) {return d[0];})])
		.range([0, w]);

	var rect = d3.select('svg')
		.selectAll('rect')
		.data(userInfo);

		
	rect
		.enter()
		.append('rect')
		.attr('x', 0)
		.attr('y', function (d, i) {return i * (h / userInfo.length);})
		.attr('height', 50)
		.attr('width', function (d) {return xScale(d);})
		.style('fill', function (d, i) {return (i < 1 ? "#5E8499": "#FF8351");});	
	}

