module.exports = function(app){

	var aula 	= app.controllers.aulasPraticas;
	var aluno 	= app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');

	app.route('/aulas/praticas') //Atualiza a lista de instrutores, alunos e veículos
		.get(autenticar, aula.refresh);

	app.route('/aulas/index')
		.get(autenticar, aula.index);

	app.route('/aulas/praticas/aluno/:id')
		.post(aula.seleciona_aluno);

	app.route('/aulas/praticas/instrutor/:id')
		.post(aula.seleciona_instrutor);

	app.route('/aulas/praticas/veiculo/:id')
		.post(aula.seleciona_veiculo);



		// LIDANDO COM AJAX

	app.route('/busca/aluno')
		.post(aluno.busca);

	app.route('/agenda/aula/pratica')
		.post(aula.aulaPratica)
}