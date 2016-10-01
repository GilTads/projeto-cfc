module.exports = function(app){

	var Aluno = app.models.aluno;
	var Instrutor = app.models.usuario;

	var aulasPraticasController = {
		index: function(req, res){

			Aluno.find(function(err, alunos){
				if(err){
					req.redirect('/home');
				}else{
					Instrutor.find({setor: 'Instrutor'},function(err, instrutor){
						if(err){
							console.log('Pau');
						}else{
							res.render('aulas/index_pratica',
							 {lista_instrutor: instrutor, lista_aluno: alunos});
						}
					});
				}
			});

			
		},

		teste: function(req, res){
			console.log(req.params.id);
			
		}
	
	}
	return aulasPraticasController;
}