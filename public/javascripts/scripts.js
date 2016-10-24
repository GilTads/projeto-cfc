$(document).ready(function(){

  $('#searchAluno').click(function(){
    var cpf = $('#cpf').val();
    $.ajax({
      url: '/busca/aluno',
      type: 'post',
      dataType: 'json',
      data: {cpf: cpf},
      error: function(err){
        
        alert('Nenhum dado encontrado');
        $('#aluno').html('');
      },
       beforeSend: function(){
        $('#loader').css({display:'block'});
      },
      complete: function(){
        setTimeout(function() {$('#loader').hide()}, 1000);
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
  });

var id_instrutor;
var id_veiculo;
var dataToMongo;



  // AGENDAR AULA PRATICA
$('#praticaForm').submit(function(e){
 
  var cpf_aluno = $('#cpf').val();
  var data = $('#data').val();
  e.preventDefault();
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
});




// SELECIONA INSTRUTOR PARA A AGENDA PRATICA
$(document).on('change', "#selIns", function(){
    var instrutor = $(this).find('option:selected').text();
    id_instrutor = ($(this).val());
    $('#instrutor').val(instrutor);
    $('.instrutorPratico').css({display: 'block'});
});


// SELECIONA O VEÍCULO PARA A AGENDA PRATICA
$(document).on('change', '#selVeic', function(){
  var veiculo = $(this).find('option:selected').text();
  id_veiculo = ($(this).val());
  $('#veiculo').val(veiculo);
  $('.veiculoPratico').css({display: 'block'});
});
  

// $('#aluno').click(function(){
//   $.ajax({
//     url: '/aulas/praticas/aluno/:id',
//     type: 'post',
//     dataType: 'html',
//     data: {'id': '_id'},
//     sucess: function(dados){
//       $('#inputAluno').val(dados);
//     }
//   });
// });
//$('#myModal').modal({'backdrop': 'static'});




/* AULAS/INDEX_PRATICA -  TROCA BOTÕES DE LIMPAR INPUT COM BUSCA ALUNO*/
// if($('#alunoInput').val()){
//   $('#buscarAluno').hide();
//   $('#limpar').show();
// }





$('.editar').click(function(){
  $('#data_cad').hide();
  $('input, select').removeAttr('disabled');
  $('#atualizar').show();
  $('.editar').hide();
  $('#sexShow').hide();
  $('#sexChoose').show();
  $('#labSex').show();
});


/* No campo de cadastro de funcionarios adiciona inputs a mais caso for instrutor*/
$('input:radio').change( function(){
  if(this.value == "Instrutor"){
    $(".onlyInstrutor").fadeIn('slow');
  }else if(this.value == "Administrador"){
    $(".onlyInstrutor").fadeOut('slow');
  }
});

$("#success-alert").fadeTo(2000, 1000).slideUp(800, function(){
    $("#success-alert").slideUp(2000);
});

      // JQUERY TABLES 
    $('.listar-usuarios').dataTable({
      "language": {
        "lengthMenu"  : "Exibir _MENU_  usuários por página",
        "info"        : "Mostrando página  _PAGE_ de _PAGE_",
        "search"      : "Procurar",
        "zeroRecords" : "Nenhum resultado encontrado",
        "infoEmpty"   : "Mostrando página _PAGE_ de _PAGE_",
        "infoFiltered": ". Filtrando a partir de um total de _MAX_ entradas",
        "paginate"    : {
          "previous"  : "Anterior",
          "next"      : "Próxima"
        }
      }
    });



// CONFIGURANDO DATEPICKER
    $.datepicker.regional['pt-BR'] = {
    changeYear: true,
    yearRange: '1900:2100',
    closeText: 'Fechar',
    prevText: '&lt;Anterior',
    nextText: 'Próximo&gt;',
    currentText: 'Hoje',
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    weekHeader: 'Sm',
    // dateFormat: 'dd/mm/yy',
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''};


  $.datepicker.setDefaults($.datepicker.regional['pt-BR']);

   $('#date').datepicker();

  



// AGENDAMENTO DE AULAS PRATICAS DATETIMEPICKER
$.datetimepicker.setLocale('pt-BR');
var dateToDisable = '10.12.2016 08:40';
$('#datetimepicker').datetimepicker({
  format:'d.m.Y H:i',
  minDate: 0,
  inline: true,
  allowTimes: [
    '07:00','07:50','08:40',
    '09:20','10:10','11:00',
    '13:00','13:50','14:40',
    '15:30','16:20','17:10',
    '18:00'
  ],
  onSelectTime : function(dp, $input){
    var atual = $($input).val();
    var data = dp.getMonth()+'/'+dp.getDate()+'/'+dp.getFullYear();
    $('#data').val(atual);
    dataToMongo = data;
  }

});






      //JQUERY CONFIRM EXCLUIR USUARIO
    $('#myBtn').on('click', function(e){
      e.preventDefault();
      $.confirm({
        theme: 'black',
        icon: 'fa fa-warning',  
        title: 'Aviso!!',
        content: 'O funcionário será excluído definitivamente. Deseja continuar?',
        confirmButton: 'SIM',
        cancelButton: 'NÃO',
        confirmButtonClass: 'btn-danger',
        cancelButtonClass: 'btn-default',
        animationSpeed: 500,
        animationBounce: 2.5,
        confirm: function(e){
   
            $("#excluir-user").submit();
        },
          cancel: function(){
            $.alert({
              theme: 'black',
              icon: 'fa fa-close',
              title: 'Cancelado',
              content: 'Exclusão cancelada',
              animationSpeed: 800,
              animationBounce: 2.5,
              confirmButton: 'OK',
            });
          }
    });
  });



      //JQUERY CONFIRM EXCLUIR ALUNO
    $('#excluir-alunoBtn').on('click', function(e){
      e.preventDefault();
      $.confirm({
        theme: 'black',
        icon: 'fa fa-warning',  
        title: 'Aviso!!',
        content: 'O registro será excluído definitivamente. Deseja continuar?',
        confirmButton: 'SIM',
        cancelButton: 'NÃO',
        confirmButtonClass: 'btn-danger',
        cancelButtonClass: 'btn-default',
        animationSpeed: 500,
        animationBounce: 2.5,
        confirm: function(e){
   
            $("#excluir-aluno").submit();
        },
          cancel: function(){
            $.alert({
              theme: 'black',
              icon: 'fa fa-close',
              title: 'Cancelado',
              content: 'Exclusão cancelada',
              animationSpeed: 800,
              animationBounce: 2.5,
              confirmButton: 'OK',
            });
          }
    });
  });


new dgCidadesEstados({ 
  estado: document.getElementById('estado')
  ,cidade: document.getElementById('cidade')
 });

});