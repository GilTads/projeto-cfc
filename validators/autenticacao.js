module.exports = function(req,res){
	req.assert('email', 'Email inválido.').isEmail();
	req.assert('senha', 'A senha deve conter entre 6 e 12 caracteres.').len(6,12);

	var validaErros = req.validationErrors() || [];

	if(validaErros.length > 0){
		validaErros.forEach(function(e){
			console.log('Erro doido: ', e.msg);
			req.flash('erro', e.msg);
		});
		return false;
	}
	return true;
}