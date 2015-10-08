//jQuery functions

(function(loadIt){

	$('#gradCalc').on('submit', function(e) {
		e.preventDefault();
	
		var data = {
			currentIncome : $('#currentIncome').val(),
			ageCurrent : $('#ageCurrent').val(),
			expectedIncome : $('#expectedIncome').val(),
			lostIncome : $('#lostIncome').val(),
			gradTuition : $('#gradTuition').val(), //this currently includes living expenses
			gradYears : $('#gradYears').val(),
			loanTotal : $('#loanTotal').val(),
			loanAPR : $('#loanAPR').val(),
			loanTerm: $('#loanTerm').val(),
			ageCurrent : $('#ageCurrent').val(),			
		}
		printOutput(data);
	});

	$('#toggleAdvanced').on('click', function(e) {
		e.preventDefault();	
		
		$('#toggleAdvanced').toggleClass('advSelect advUnselect');

		$('.advancedOption').toggle();
	});

	function printOutput(data) {

		var lifeEarningsCurrent = gradROI.lifetimeEarningsCurrent(data),
			lifeEarningsExpected = gradROI.lifetimeEarningsExpected(data),
			returnRate = gradROI.returnRate(data),
			loanCost = gradROI.loanCost(data);

		var ageOfReturn = gradROI.ageOfReturn(data);


		$('#salChart').remove();
		var salaryChart = new MU30Chart.graph([lifeEarningsCurrent.annual, lifeEarningsExpected.annual], 'age', 'salary', 'salChart');
		
		$('#earningsChart').remove();
		var earningsChart = new MU30Chart.graph([lifeEarningsCurrent.annual, lifeEarningsExpected.annual], 'age', 'lifeEarnings', 'earningsChart');


		$('#output').show();

		$('#earningsTable').empty()
			.append(
			"<tr><td>Current Salary</td><td>$"+(lifeEarningsCurrent.totalEarnings).formatMoney(0)+"</td></tr>"
			)
			.append(
			"<tr><td>New Salary</td><td>$"+(lifeEarningsExpected.totalEarnings).formatMoney(0)+"</td></tr>"
		);
		$('#costTable').empty()
			.append(
			"<tr><td>Potential Income</td><td>$"+(Number(data.currentIncome)*Number(data.gradYears)).formatMoney(0)+"</td></tr>"
			)
			.append(
			"<tr><td>Tuition and Living Expenses</td><td>$"+(Number(data.gradTuition)-loanCost).formatMoney(0)+"</td></tr>"
			)
			.append(
			"<tr><td>Student Loans</td><td>$"+loanCost.formatMoney(0)+"</td></tr>"
		);
		$('#returnTable').empty();
		if (typeof ageOfReturn != 'undefined'){
			$('#returnTable').append(
				"<tr><td>Age when earnings exceed current projection</td><td>"+ageOfReturn+"</td></tr>"
			);
		}
		$('#returnTable').append(
			"<tr><td>Rate of Return</td><td>"+(Math.floor(returnRate)+'%')+"</td></tr>"
		);

	}

})();

//Format numbers to US currency standard
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

//grad school ROI calculator
var gradROI = (function() {


	function lifetimeEarnings(age, startingSalary, annualGrowth, retirement, debt) {
		if (typeof debt == 'undefined') { var debt = 0}
			else { var debt = Number(debt);}
		if ( age && startingSalary) {
			
			var annualGrowth = annualGrowth || 3;
			var retirement = retirement || 70;
			

			var i,
				length = retirement - age,
				salary = parseInt(startingSalary),
				rate = annualGrowth / 100,
				careerWealth = {};

			careerWealth.totalEarnings = 0 - debt;
			careerWealth.annual = [];
		
			for (i = 0; i < length; i++) {

				var curYear = {};
				curYear.year = i;
				curYear.age = i+parseInt(age);
				if (i == 0) {
					careerWealth.totalEarnings = careerWealth.totalEarnings + salary;
					curYear.lifeEarnings = careerWealth.totalEarnings;
					curYear.salary = salary;
				} else {
					careerWealth.totalEarnings += parseInt(salary);
					curYear.lifeEarnings = careerWealth.totalEarnings;
					salary = salary + (salary * rate);
					curYear.salary = salary;
				}
				careerWealth.annual.push(curYear);
			}
			return careerWealth;
		} else {
			console.log('lifetimeEarnings needs age, startingSalary', startingSalary, startingSalary);
			return null;
		}
	}

	function returnRate(finalValue, initialValue, age, retirement) {
		var retirement = retirement || 70;

		var time = retirement - age;
		var diff = finalValue - initialValue;
		return (diff/time) / 100;

	}

	/*Roll your own number convertor from notation*/
	function toFixed(x) {
	  if (Math.abs(x) < 1.0) {
	    var e = parseInt(x.toString().split('e-')[1]);
	    if (e) {
	        x *= Math.pow(10,e-1);
	        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
	    }
	  } else {
	    var e = parseInt(x.toString().split('+')[1]);
	    if (e > 20) {
	        e -= 20;
	        x /= Math.pow(10,e);
	        x += (new Array(e+1)).join('0');
	    }
	  }
	  return x;
	}
	/*Decimal Rounding */
	(function() {
	  /**
	   * Decimal adjustment of a number.
	   *
	   * @param {String}  type  The type of adjustment.
	   * @param {Number}  value The number.
	   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
	   * @returns {Number} The adjusted value.
	   */
		  function decimalAdjust(type, value, exp) {
		    // If the exp is undefined or zero...
		    if (typeof exp === 'undefined' || +exp === 0) {
		      return Math[type](value);
		    }
		    value = +value;
		    exp = +exp;
		    // If the value is not a number or the exp is not an integer...
		    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		      return NaN;
		    }
		    // Shift
		    value = value.toString().split('e');
		    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		    // Shift back
		    value = value.toString().split('e');
		    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
		  }

		  // Decimal round
		  if (!Math.round10) {
		    Math.round10 = function(value, exp) {
		      return decimalAdjust('round', value, exp);
		    };
		  }
		  // Decimal floor
		  if (!Math.floor10) {
		    Math.floor10 = function(value, exp) {
		      return decimalAdjust('floor', value, exp);
		    };
		  }
		  // Decimal ceil
		  if (!Math.ceil10) {
		    Math.ceil10 = function(value, exp) {
		      return decimalAdjust('ceil', value, exp);
		    };
		  }
		})();

	function loanCost(amount, apr, term, format) {
		var amount = Number(amount),
			apr = Number(apr)/100,
			term = Number(term),
			compoundRate = 1,
			rate = apr / compoundRate,
			months,
			years;

		if (format == 'months') {
			months = term;
			years = months/12;
		} else if (format == 'years') {
			years = term;
			months = term*12;
		} else {
			console.log('loanCost expects format to be months or years');
		}
	
		if (months > 0) {
			var interestRate = Math.pow((rate+1), years);
			var totalCompounded = Math.round10((amount * interestRate), 1);
			var annualPayments = totalCompounded/years;
			return annualPayments;
		} else {
			return amount;
		}
	}
	function ageOfReturn(current, future, programLength) {
		var current = current.annual,
			future = future.annual,
			gradYears = parseInt(programLength),
			ageOfReturn;

		for (var i = 0; i<current.length; i++) {
			if (typeof future[i] != 'undefined') {
				var a = future[i].lifeEarnings;
			}
			if (typeof current[i+gradYears] !='undefined'){
				var b = current[i+gradYears].lifeEarnings;
			}
			if (a > b){
				ageOfReturn = future[i].age;
				break;
			} 
				
		}
		return ageOfReturn;
		
	}

	return {
		lifetimeEarningsCurrent : function(data) {
			return lifetimeEarnings(data.ageCurrent, data.currentIncome, data.salRate, data.ageRetirement);
			}
		,
		lifetimeEarningsExpected : function(data) {
			var lostIncome = parseInt(data.gradYears * data.currentIncome);
			var age = parseInt(data.ageCurrent) + parseInt(data.gradYears);
			var debt = loanCost(data.loanTotal, data.loanAPR, data.loanTerm, 'years') + lostIncome;
			return lifetimeEarnings(age, data.expectedIncome, data.salRate, data.ageRetirement, debt);
			}
		,
		returnRate: function(data) {
			var lostIncome = parseInt(data.gradYears * data.currentIncome);
			var ageAfterGrad = parseInt(data.ageCurrent) + parseInt(data.gradYears);
			var debt = lostIncome + loanCost(data.loanTotal, data.loanAPR, data.loanTerm, 'years') * data.loanTerm;
			var earningsCurrent = lifetimeEarnings(data.ageCurrent, data.currentIncome);
			var earningsExpected = lifetimeEarnings(ageAfterGrad, data.expectedIncome, 3, 70, debt);
			var earningsDiff = earningsExpected.totalEarnings - earningsCurrent.totalEarnings;
			return returnRate(earningsDiff, data.gradTuition, data.ageCurrent);
			}
		,
		loanCost: function(data) {
			if (data.loanTerm > 0 ){
				return loanCost(data.loanTotal, data.loanAPR, data.loanTerm, 'years')*data.loanTerm;
			} else {
				return Number(data.loanTotal);
			}
		},
		ageOfReturn: function(data) {
			var lostIncome = parseInt(data.gradYears * data.currentIncome);
			var debt = lostIncome + loanCost(data.loanTotal, data.loanAPR, data.loanTerm, 'years') * data.loanTerm;
			var ageAfterGrad = parseInt(data.ageCurrent) + parseInt(data.gradYears);
			var earningsCurrent = lifetimeEarnings(data.ageCurrent, data.currentIncome);
			var earningsExpected = lifetimeEarnings(ageAfterGrad, data.expectedIncome, 3, 70, debt);
			return ageOfReturn(earningsCurrent, earningsExpected, data.gradYears);
		}
	}

})();
