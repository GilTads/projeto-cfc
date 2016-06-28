module.exports = function(app){

	var usuario    = app.controllers.usuarios;
	var autenticar = require('../middleware/autenticar');


	app.route('/cadastro')
		.get(autenticar, usuario.cadastro)
		.post(usuario.create);

	app.route('/usuarios')
		.get(autenticar, usuario.index);
}