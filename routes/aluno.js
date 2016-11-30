module.exports = function(app){

	var aluno	   = app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');
	var permissao = require('../middleware/permissao');

	app.route('/alunos')
		.get(autenticar, aluno.index);

	app.route('/cadastro/aluno')
		.get(autenticar,permissao, aluno.cadastro)
		.post(aluno.create);


	app.route('/alunos/listar/:id')
		.get(autenticar, aluno.listar);

	app.route('/alunos/editar/:id')
		.post(autenticar,permissao, aluno.update);


	app.route('/alunos/excluir/:id')
		.post(permissao, aluno.excluir);

	app.route('/ajaxing')
		.post(aluno.ajaxing);

	app.route('/area/aluno')
		.get(aluno.areaAluno);
}