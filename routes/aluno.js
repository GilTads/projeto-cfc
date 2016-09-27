module.exports = function(app){

	var aluno	   = app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');

	app.route('/alunos')
		.get(autenticar, aluno.index);

	app.route('/cadastro/aluno')
		.get(autenticar, aluno.cadastro)
		.post(aluno.create);
}