module.exports = function(app){

	var aula 	= app.controllers.aulasTeoricas;
	var aluno 	= app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');


	app.route('/aulas/teoricas')
		.get(autenticar, aula.index);

	app.route('/cadastrar/pacote')
		.post(aula.criarPacote);

	app.route('/buscar/teoricas')
		.post(aula.buscarAulas);

	app.route('/teorico/excluir/:id')
		.get(autenticar,aula.excluir);

	app.route('/cronograma')
		.get(aula.cronograma);

	app.route('/buscar/cronograma')
		.post(aula.buscarCronograma);

	app.route('/agendar/teorico')
		.post(aula.agendar)
}