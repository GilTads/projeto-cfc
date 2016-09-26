module.exports = function(app){

	var aluno = app.controllers.alunos;


	app.route('/alunos')
		.get(aluno.index);
}