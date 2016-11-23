$(document).ready(function() {
	
	$('.timepicker').pickatime({
		format: 'H:i',
		min: [7,0],
		max: [23,0],
		interval: 30,
    onClose: function() {
      $('.timepicker').blur();
    }

	});

  $('.picker').appendTo('body');

});

// $('#listTeorico').on('click', function(){
//   $('#gradeTeorica').css({display: 'block'});
// });