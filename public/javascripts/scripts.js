$(document).ready(function(){



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