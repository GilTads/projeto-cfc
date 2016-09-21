module.exports = function(app){

	var usuario    = app.controllers.usuariosControle;
	var autenticar = require('../middleware/autenticar');


	app.route('/cadastro')
		.get(/*autenticar, */usuario.cadastro)
		.post(usuario.create);

	app.route('/usuarios')
		.get(autenticar, usuario.index);


	app.route('/usuarios/listar/:id')
		.get(autenticar, usuario.listar);

	app.route('/usuarios/editar/:id')
		.get(usuario.editar)
		.post(usuario.update);


	app.route('/usuarios/excluir/:id')
		.post(usuario.excluir);
}