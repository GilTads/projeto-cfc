module.exports = function(app){

	var aula = app.controllers.aulasPraticas;
	var autenticar = require('../middleware/autenticar');

	app.route('/aulas/praticas')
		.get(autenticar, aula.index);

	app.route('/aulas/praticas/:aluno_id')
		.get(aula.pegar_aluno);


}