$(document).ready(function(){

    // $('#myBtn').click(function(){
    //     var pergunta = confirm('Deseja realmente excluir?');
    //     if(!pergunta){
    //       return false;
    //     }

    // $("#excluir-user").submit(function(){
    //   $.confirm({
    //       theme: 'black',
    //       icon: 'fa fa-warning',  
    //       title: 'Aviso!!',
    //       content: 'O funcionário será excluído definitivamente. Deseja continuar?',
    //       confirmButton: 'SIM',
    //       cancelButton: 'NÃO',
    //       confirmButtonClass: 'btn-danger',
    //       cancelButtonClass: 'btn-default',
    //       animationSpeed: 500,
    //       animationBounce: 2.5,
    //       confirm: function(){
    //         $.alert({
    //           id: 'confirma',
    //           theme: 'black',
    //           icon: 'fa fa-check',
    //           title: 'Exclusão',
    //           content: 'Funcionário excluído',
    //           confirmButton: 'OK',
    //           animationSpeed: 800,
    //           animationBounce: 2.5,
    //         }); 
    //       },
    //       cancel: function(){
    //         $.alert({
    //           theme: 'black',
    //           icon: 'fa fa-close',
    //           title: 'Cancelado',
    //           content: 'Exclusão cancelada',
    //           animationSpeed: 800,
    //           animationBounce: 2.5,
    //           confirmButton: 'OK',
    //         });
    //       }
    //     });
          
    //   });

    $('#listar-usuarios').dataTable({
      "language": {
        "lengthMenu"  : "Exibir _MENU_  usuários por página",
        "info"        : "Mostrando página  _PAGE_ de _PAGE_",
        "search"      : "Procurar",
        "zeroRecords" : "Nenhum resultado encontrado",
        "infoEmpty"   : "Mostrando página _PAGE_ de _PAGE_",
        "infoFiltered": "Filtrando a partir de um total de _MAX_ entradas",
        "paginate"    : {
          "previous"  : "Anterior",
          "next"      : "Próxima"
        }
      }
    });


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
          // $.alert({
          //   id: 'confirma',
          //   theme: 'black',
          //   icon: 'fa fa-check',
          //   title: 'Exclusão',
          //   content: 'Funcionário excluído',
          //   confirmButton: 'OK',
          //   animationSpeed: 800,
          //   animationBounce: 2.5,
          // });
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
});