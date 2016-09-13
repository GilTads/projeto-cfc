
$(document).ready(function(){

//=========Máscara para telefones========//
    $('.fone').mask('(00) 0000-00009');
    $('.fone').blur(function(event) {
        if($(this).val().length == 15){ // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
        $('.fone').mask('(00) 00000-0009');
    } else {
          $('.fone').mask('(00) 0000-00009');
       }
    });


//==============CPF======================//

    $('#cpf').mask('000.000.000-00');



// =============Placa de veículos============//

	$('#placa').keyup(function(){
		$(this).val($(this).val().toUpperCase());
		$(this).mask('AAA - 9999');
	});

});
