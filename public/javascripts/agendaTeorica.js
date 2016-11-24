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

  	$('#agendarT').click(function(e){
  		e.preventDefault();
  		var id;
  		$('#teoricoTable input:checkbox[name=ch]').each(function(){
  			var $this = $(this);
  			if($this.is(':checked')){
  				id = $this.attr('id');
  				$.ajax({
		  			url: '/agendar/teorico',
		  			type: 'post',
		  			data: {ch: id},
		  			success: function(res){
		  				console.log(res);
		  			}
		  		})
  				console.log(id);
  			}
  		});
  		
  		
  	});


  	
});

	