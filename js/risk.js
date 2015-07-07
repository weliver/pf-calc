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