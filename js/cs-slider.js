// $('#sliderInput').rangeslider({
// 	onInit: function(){
// 		console.log('slider ready');
// 	},
// 	onSlide: function(position, value) {
// 		$('#cs-label').text(v);
// 	}
// });

(function creditScoreSlider() {


$('#sliderInput').on('input', function(e) {
	e.preventDefault();
	var slideVal = $(this).val();
	$('.cs-score').text(slideVal);
	updateContent(slideVal);
});


function updateContent(value) {
	if (value >=550 && value <660){
		$('.lowTier').addClass('active').siblings().removeClass('active');
	} else if (value >=660 && value < 720){
		$('.middleTier').addClass('active').siblings().removeClass('active');
	} else if (value >= 720) {
		$('.highTier').addClass('active').siblings().removeClass('active');
	}
}
})();


