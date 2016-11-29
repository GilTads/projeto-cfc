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

    
      $(document).on('change', '#aluno', function(){
        var id_aluno
        id_aluno = ($(this).val());
      $('#idAluno').val(id_aluno);
    });
      

  	$('#aT').submit(function(e){
      e.preventDefault();
      var form = this;
  		var id=[];
      var id_aluno;
  		$('#teoricoTable input:checkbox[name=ch]').each(function(){

        id_aluno = ($('#idAluno').val());
  			var $this = $(this);

  			if($this.is(':checked')){
  				id.push($this.attr('id'));

  			}

  		});
  		$.ajax({
           url: '/agendar/teorico',
           type: 'post',
           data: {ch: id, idAluno: id_aluno},
            success:function(){
              form.submit();
            }
            
         });
  		
  	});


  	
});

	