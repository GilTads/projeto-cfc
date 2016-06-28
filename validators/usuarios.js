var url = require('url');
var CPF =  require('cpf_cnpj').CPF;

module.exports = function(req,res){
	var createUrl = url.parse(req.url).pathname == "usuarios/cadastro";

	var cpf = req.body.cpf;
	
	req.assert('nome', 'Informe o nome.').notEmpty();
	if(createUrl){
		req.assert('email', 'Email inválido').isEmail();
		req.assert('senha', 'A senha deve conter de 6 a 12 caracteres').len(6,12);
		if(!CPF.isValid(cpf)){
			req.assert('cpf', 'CPF inválido');
		}
	}
	
	

	var validaErros = req.validationErrors() || [];

	if(req.body.senha != req.body.confirma_senha){
		validateErros.push({msg: 'Senha não confere.'});
	}

	if(validaErros.length > 0){
		validaErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}else{
		return true;
	}
}