module.exports = function(app){

	var aula = app.controllers.aulasPraticas;
	var autenticar = require('../middleware/autenticar');

	app.route('/aulas/praticas')
		.get(autenticar, aula.index);

	app.route('/aulas/praticas/aluno/:id')
		.post(aula.seleciona_aluno);

	app.route('/aulas/praticas/instrutor/:id')
		.post(aula.seleciona_instrutor);

	app.route('/aulas/praticas/veiculo/:id')
		.post(aula.seleciona_veiculo);
}