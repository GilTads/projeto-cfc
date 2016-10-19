module.exports = function(app){

	var aluno	   = app.controllers.alunos;
	var autenticar = require('../middleware/autenticar');
	var permissao = require('../middleware/permissao');

	var Aluno = app.models.aluno; // Variável de teste para AJAX

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


// ROTA PARA TESTES DE AJAX
	app.post('/aluno', function(req, res){
		var nome = req.body.nome;
		Aluno.findOne({'nome': nome}, function(err,dados){
			if(err){
				req.flash('Deu merda');
				console.log('Entrou no ajax mas deu erro');
			}else{
				console.log('Deu certo o Ajax');
				res.send(dados.nome);
			}
		});
	});
}