module.exports = function(app){

	var usuario    = app.controllers.usuarios;
	var autenticar = require('../middleware/autenticar');
	var permissao = require('../middleware/permissao');

	app.route('/cadastro')
		// DESCOMENTAR O '/autenticar' PARA CADASTRAR SOMENTE QUANDO LOGADO
		.get(autenticar,permissao, usuario.cadastro) 
		.post(permissao, usuario.create);

	app.route('/usuarios')
		.get(autenticar, usuario.index);


	app.route('/usuarios/listar/:id')
		.get(autenticar, usuario.listar);

	app.route('/usuarios/editar/:id')
		.get(usuario.editar)
		.post(permissao, usuario.update);


	app.route('/usuarios/excluir/:id')
		.post(permissao, usuario.excluir);
}