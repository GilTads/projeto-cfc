var url = require('url');
var CPF =  require('cpf_cnpj').CPF;

module.exports = function(req,res){
	var createUrl = url.parse(req.url).pathname == "/cadastro";
	console.log(createUrl);
	var cpf = req.body.cpf;
	
	req.assert('nome', 'Informe o nome.').notEmpty();
	if(createUrl){
		console.log('ENTROU AQUI');
		req.assert('email', 'Email inválido').isEmail();
		req.assert('senha', 'A senha deve conter de 6 a 12 caracteres').len(6,12);
		// if(CPF.isValid(cpf) == false){
		// 	console.log('CPF é: ',CPF.isValid(cpf));
		// 	req.assert('cpf', 'CPF inválido').isCPF(); //Aqui não está workando.. aprender mais sobre assert
		// }
	}
	
	

	var validaErros = req.validationErrors() || [];

	if(req.body.senha != req.body.confirma_senha){
		validaErros.push({msg: 'Senha não confere.'});
	}
	// if(!CPF.isValid(cpf)){ ////////ATIVAR PARA VALIDAR CPF
	// 	validaErros.push({msg: 'CPF inválido!'});
	// }

	if(validaErros.length > 0){
		validaErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}else{
		return true;
	}
}