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

  	$('#aT').submit(function(e){
      e.preventDefault();
      var form = this;
  		var id=[];
      var aluno = $('#alunos').find('option:selected').text();
      console.log(aluno);
  		$('#teoricoTable input:checkbox[name=ch]').each(function(){

  			var $this = $(this);

  			if($this.is(':checked')){
  				id.push($this.attr('id'));

  			}

  		});
  		$.ajax({
           url: '/agendar/teorico',
           type: 'post',
           data: {ch: id},
            success:function(){
              form.submit();
            }
            
         });
  		
  	});


  	
});

	