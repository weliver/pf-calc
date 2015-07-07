
$(function(){
	var user = {}

	$('#quiz').on('submit', function(e){
		e.preventDefault();
		tallyUp();
		printScore();
	});
	var tallyUp = function(){
		var total = 0;
		var ageScore = function(){
			var age = parseInt($('#q1age').val());
			if (age <30)
				return  3;
			else if (age >30 && age<46)
				return  2;
			else if (age >45 && age<56)
				return  1;
			else if (age >55)
				return  0;
			else
				$('wrong').show();

		}
		user.ageScore = ageScore();
		var tally = $('input:radio:checked').each(function(){	
		var b = ($(this).val());
		var a = parseFloat(b);
		total = total + a;
		user.total = total;
		});
		
		var total = user.total;
		var ageScore = user.ageScore;
		user.riskScore = total + ageScore;
			
	}
	var printScore = function(){
			var ans = user.riskScore;
			console.log=("Score is"+ans);
				if (ans >0 && ans<5){
					$('#conservative').siblings().hide();
					$('#conservative').show();
								}
				else if (ans >4 && ans<9){
					$('#moderate').siblings().hide();
					$('#moderate').show();
								}
					else if (ans >8 && ans<13){
					$('#aggresive').siblings().hide();					
					$('#aggresive').show();
								}
				else if (ans >12){
					$('#veryaggresive').siblings().hide();	
					$('#veryaggresive').show();
								}
				else
					{
					$('#wrong').siblings().hide();	
					$('#wrong').show();
				}
			}
	
	});
/*Emergency Fund Calculator*/
/*
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
*/