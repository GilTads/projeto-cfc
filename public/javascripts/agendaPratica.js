$(document).ready(function(){
	$('.calendario').pickadate({
    // Day states
    day: 'picker__day',
    disabled: 'picker__day--disabled',
    selected: 'picker__day--selected',
    highlighted: 'picker__day--highlighted',
    now: 'picker__day--today',
    infocus: 'picker__day--infocus',
    outfocus: 'picker__day--outfocus',

    // The picker footer
    footer: 'picker__footer',
});




  function verificaHorario(dadosAula,classe){
      var hora = dadosAula.getHours();
      var min = dadosAula.getMinutes();
      var dia = dadosAula.getDate();
      var mes = dadosAula.getMonth()+1;
      var ano = dadosAula.getFullYear();

      if(min == 0){
        min = min+ '0';
      }
      if(dia < 10){
      	dia = '0'+dia;
      }

      var dataAula = dia +'/' +mes+'/'+ ano;
      var horaAula = hora+':'+min;
      console.log('Hora do Mongo: '+dataAula+' '+horaAula);
      //BUSCA A HORA DA AULA  E PASSA PRO CALENDARIO

      if($('.calendario').val() == dataAula ){
      	console.log('dataAula: '+ dataAula);
        $('.hora').each(function(){
          if($(this).val() == horaAula){
            // console.log('Comparar-- Mongo: '+ dataAula+ ' '+ horaAula+
            //  ' Calendário: '+ $('.calendario').val() + ' '+ $(this).val()+ ' Classe: '+classe );
            $(this).addClass(classe);
            console.log($(this));
            $(this).attr('disabled','disabled');  
          }
        });
        
      }
      // else{
      //       $('.hora').each(function(){
      //         $(this).removeClass(classe);
      //         if($(this).hasClass('agendadoInstrutor') || 
      //           $(this).hasClass('agendadoVeiculo') ||
      //           $(this).hasClass('agendadoaluno')){
      //           }else{
      //             $(this).removeAttr('disabled','disabled');
      //           }
              
      //       });
      // }
  };





  //INSERE A DATA E A HORA NO INPUT DATA AULA
  $('.hora').on('click', function(){
    if(!$('.calendario').val()){
      $.dialog({
          theme: 'black',
          icon: 'fa fa-warning',  
          title: 'Aviso!!',
          content: 'Insira uma data',
          animationSpeed: 500,
          animationBounce: 2.5,
        });
    }else{
      $('#data').val($('.calendario').val() +' '+ $(this).val());
    }
  });


  $('.calendario').on('change', function(){

      $.ajax({//Verifica se há dados de aula para este aluno
        url: '/verificaAula/aluno',
        type: 'post',
        dataType: 'json',
        data: {cpf: $('#cpf').val()},
        error: function(){
          console.log('Não foram encontradas aulas');
        },
        success: function(aula){
          //ANTES DE VERIFICAR SE O ALUNO TEM AULA
          //RESETA AS CONFIGURAÇÕES DOS HORARIOS
         $('.hora').each(function(){
            $(this).removeClass('agendadoAluno');
                if($(this).hasClass('agendadoInstrutor') || $(this).hasClass('agendadoVeiculo')){
                }else{
                  $(this).removeAttr('disabled','disabled');
                }
                
            });

          for(var i =0; i < aula.horario.pratico.length; i++){
              var dadosAula = new Date(aula.horario.pratico[i]);
              verificaHorario(dadosAula, 'agendadoAluno');
          }

        }
      });
      if($('#selIns').val() != null){
	      	$.ajax({
	        url: '/verificaAula/instrutor',
	        type: 'POST',
	        data:{id: id_instrutor},
	        error: function(){
	          console.log('Não foram encontradas aulas');
	        },
	        success: function(aula){

	          $('.hora').each(function(){
	            $(this).removeClass('agendadoInstrutor');
	              if($(this).hasClass('agendadoAluno') || $(this).hasClass('agendadoVeiculo')){
	                }else{
	                  $(this).removeAttr('disabled','disabled');
	                }
	            
	            
	          });
	          for(var i =0; i < aula.horario.pratico.length; i++){
	              var dadosAula = new Date(aula.horario.pratico[i]);
	              if(dadosAula != null){
	              	verificaHorario(dadosAula, 'agendadoInstrutor');
	              }
	              
	          }
	        }
	      });
      }
      if($('#selVeic').val() != null){
  	      $.ajax({
	      url: '/verificaAula/veiculo',
	      type: 'POST',
	      data:{id: id_veiculo},
	      error: function(){
	          console.log('Não foram encontradas aulas');
	      },
	      success: function(aula){

	        $('.hora').each(function(){
	          $(this).removeClass('agendadoVeiculo');
	          if($(this).hasClass('agendadoAluno') || $(this).hasClass('agendadoInstrutor')){
	              }else{
	                $(this).removeAttr('disabled','disabled');
	              }
	          
	          
	        });
	        for(var i =0; i < aula.horario.pratico.length; i++){
	            var dadosAula = new Date(aula.horario.pratico[i]);
	            if(dadosAula != null){
	            	verificaHorario(dadosAula, 'agendadoVeiculo');
	            }
	            
	        }
	      }
	    });
      }


  });



    var id_instrutor
      ,id_veiculo

    $('#searchAluno').click(function(){
      var cpf = $('#cpf').val();
      $.ajax({
        url: '/busca/aluno',
        type: 'post',
        dataType: 'json',
        data: {cpf: cpf},
        error: function(err){
          $.dialog({
            theme: 'black',
            icon: 'fa fa-warning',  
            title: 'Aviso!!',
            content: 'Nenhum aluno encontrado!',
            animationSpeed: 500,
            animationBounce: 2.5,
          });
          $('#aluno').html('');
        },
         beforeSend: function(){
          $('#loadCalendar').css({display: 'block'});
        },
        complete: function(){
          setTimeout(function() {$('#loadCalendar').hide()}, 1000);

        },
        success: function(dados){
          if(dados.categoria == "AB"){
            setTimeout(function() {$('#aluno').val(dados.nome),
           $('#aulasCarro').val(dados.qnt_aulas.carro),
           $('#aulasMoto').val(dados.qnt_aulas.moto)}, 1000);
          }else if(dados.categoria == 'B'){
            setTimeout(function() {$('#aluno').val(dados.nome),
           $('#aulasCarro').val(dados.qnt_aulas.carro)}, 1000);
          }else if(dados.categoria == 'A'){
            setTimeout(function() {$('#aluno').val(dados.nome),
           $('#aulasMoto').val(dados.qnt_aulas.moto)}, 1000);
          }
          
          $('.afterAjax').css({display: 'block'});
          $('.alunoPratico').css({display: 'block'});
        }
      });
        $.ajax({//Verifica se há dados de aula para este aluno
        url: '/verificaAula/aluno',
        type: 'post',
        dataType: 'json',
        data: {cpf: $('#cpf').val()},
        error: function(){
            $.dialog({
            theme: 'black',
            icon: 'fa fa-warning',  
            title: 'Aviso!!',
            content: 'Nenhuma aula encontrada!',
            animationSpeed: 500,
            animationBounce: 2.5,
          });
        },
        success: function(aula){
            $('.hora').each(function(){
                $(this).removeClass('agendadoAluno');
                if($(this).hasClass('agendadoInstrutor') || $(this).hasClass('agendadoVeiculo')){
                }else{
                  $(this).removeAttr('disabled','disabled');
                } 
            });
            console.log('Tamanho do vetor: '+aula.horario.pratico.length);
          for(var i =0; i < aula.horario.pratico.length; i++){
              var dadosAula = new Date(aula.horario.pratico[i]);
              
              if(dadosAula != null){
                verificaHorario(dadosAula, 'agendadoAluno');
              }
          }

        }
      });
    });


    // AGENDAR AULA PRATICA
  $('#praticaForm').submit(function(e){
      var cpf_aluno = $('#cpf').val();
      var data = $('#data').val();
      e.preventDefault();

      //VERIFICA SE TODOS OS CAMPOS ESTÃO PREENCHIDOS ANTES DE SUBMETER
      if($('#aluno').val() =='' ||
       $('#instrutor').val()==''  ||
         $('#veiculo').val()=='' ||
          $('#data').val()==''){
      $.dialog({
        theme: 'black',
        icon: 'fa fa-warning',  
        title: 'Aviso!!',
        content: 'Preencha Todos os Campos!',
        animationSpeed: 500,
        animationBounce: 2.5,
      });
    }else{
      var form = this;
      $.ajax({
        url: '/pratico/buscaId',
        type: 'POST',
        dataType: 'json',
        data: {
          aluno     : cpf_aluno,
          instrutor : id_instrutor,
          veiculo   : id_veiculo
        },
        success: function({aluno, instrutor, veiculo}){
          $('#al').val(aluno._id);
          $('#ins').val(instrutor._id);
          $('#veic').val(veiculo._id);
          form.submit();
        },
        error: function(err){
          console.log('Deu pau ao gravar aula pratica');

        },
        
      });
    }
  });




  // SELECIONA INSTRUTOR PARA A AGENDA PRATICA
  $(document).on('change', "#selIns", function(){
      var instrutor = $(this).find('option:selected').text();
      id_instrutor = ($(this).val());
      $.ajax({
        url: '/verificaAula/instrutor',
        type: 'POST',
        data:{id: id_instrutor},
        success: function(aula){

          $('.hora').each(function(){
            $(this).removeClass('agendadoInstrutor');
            if($(this).hasClass('agendadoAluno') || $(this).hasClass('agendadoVeiculo')){
                }else{
                  $(this).removeAttr('disabled','disabled');
                }
            
            
          });
          for(var i =0; i < aula.horario.pratico.length; i++){
              var dadosAula = new Date(aula.horario.pratico[i]);
              verificaHorario(dadosAula, 'agendadoInstrutor');
          }
        }
      });
      $('#instrutor').val(instrutor);
      $('.instrutorPratico').css({display: 'block'});
  });


  // SELECIONA O VEÍCULO PARA A AGENDA PRATICA
  $(document).on('change', '#selVeic', function(){
    var veiculo = $(this).find('option:selected').text();
    id_veiculo = ($(this).val());

    $.ajax({
    url: '/verificaAula/veiculo',
    type: 'POST',
    data:{id: id_veiculo},
    success: function(aula){

      $('.hora').each(function(){
        $(this).removeClass('agendadoVeiculo');
        if($(this).hasClass('agendadoAluno') || $(this).hasClass('agendadoInstrutor')){
            }else{
              $(this).removeAttr('disabled','disabled');
            }
        
        
      });
      for(var i =0; i < aula.horario.pratico.length; i++){
          var dadosAula = new Date(aula.horario.pratico[i]);
          verificaHorario(dadosAula, 'agendadoVeiculo');
      }
    }
  });

    $('#veiculo').val(veiculo);
    $('.veiculoPratico').css({display: 'block'});
  });



  $('#aulaAluno').on('click', function(){
    $('#aulaAlunoForm').submit();
  });


});