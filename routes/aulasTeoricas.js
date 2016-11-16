module.exports = function(app){

	var aula 	= app.controllers.aulasTeoricas;
	var aluno 	= app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');


	app.route('/aulas/teoricas')
		.get(autenticar, aula.index);
}