$(document).ready(function() {

				//returns ratio of debt and income fields
				function debtRatio(debt, income, callback) {

					var debt = debt;
					var income = income;
					var ratio = debt/income;
					var cleanRatio = Math.round(ratio * 100)/100;
					
					if (isNaN(cleanRatio) != true ) callback(cleanRatio);
				}

				//validates that fields are valid
				function calcValidator(inputs, callback) {

					var length = $(inputs).length;
					var input = inputs;

					for(var i=0; i<length; i++){
						var val = $(input[i]).val();
						if (parseInt(val) > 0) {
							$(input[i]).removeClass('calcInvalid');
							callback(true);
						} else {
							$(input[i]).addClass('calcInvalid');
							callback(false);
						}
					}
				}
				function printOutput(ratio) {

					var ratio = ratio * 100;
					console.log(ratio)
					if (ratio <= 15) {
						$('#dtiLow').show();
						$('#dtiLow').siblings().hide();
					} else if (ratio > 15 && ratio <=25) {
						$('#dtiMed').show();
					} else if (ratio >25 && ratio <=35) {
						$('#dtiHigh').show();
					} else if (ratio >35) {
						$('#dtiDanger').show();
					}

					$('.output').show();
					$('#outputRatio').text(ratio+'%');
				}

				//event listener for submit
				//triggers validation and calculation
				$('#debtRatio').on('submit', function(e) {
					e.preventDefault();

					var income = $('#income').val();
					var debtPayments = {
						studentLoan : $('#studentLoan').val(),
						autoPayment : $('#autoPayment').val(),
						minCredit : $('#minCredit').val(),
						mortgagePayment : $('#mortgagePayment').val(),
						otherDebt : $('#otherDebt').val()
					}
					var debtTotal = 0;
					var debt = (function(){
						$.each(debtPayments, function(key, value) {
							console.log(key, value);
							debtTotal += parseInt(value);
						});
						console.log(debtTotal);
					})();

					var ratio;
					
					var formError = $('#formError');
					var inputs = $(this).find('.calcEntry');
					
					calcValidator(inputs, function(res) {
						if (res === true) {
							debtRatio(debtTotal, income, function(ratio) {
								printOutput(ratio);

								formError.hide();
							});
						} else {
							console.log('error in fields');
							$('.output').hide();
							formError.show();
						}
					});
				});
			});