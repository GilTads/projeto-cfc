module.exports = function(app){

	var aula 	= app.controllers.aulasTeoricas;
	var aluno 	= app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');


	app.route('/aulas/teoricas')
		.get(autenticar, aula.index);

	app.route('/cadastrar/pacote')
		.post(aula.criarPacote);

	app.route('/cadastrar/pacote/:id')
		.get(aula.cronograma)

	app.route('/teorico/excluir/:id')
		.get(autenticar,aula.excluir);

	app.route('/criar/cronograma/:id')
		.post(aula.criarCronograma);
}