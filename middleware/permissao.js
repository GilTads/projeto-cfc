module.exports = function(req, res, next){
	var url = require('url');
	if(req.session.usuario){
		if(req.session.usuario.setor == 'Administrador'){
			return next();
		}else{
			req.flash('erro', req.session.usuario.nome + ', você não é um Administrador');
			res.redirect('/home');
		}
	}
	else
		return next();
	
}