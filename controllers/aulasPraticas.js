module.exports = function(app){

	var Aluno = app.models.aluno;
	var Instrutor = app.models.usuario;

	var aulasPraticasController = {
		index: function(req, res){

			Aluno.find(function(err, alunos){
				if(err){
					req.redirect('/home');
				}else{
					Instrutor.find({setor: 'Instrutor'},function(err, instrutores){
						if(err){
							req.redirect('/home');
						}else{
							
						}
							
						res.render('aulas/index_pratica', {lista_aluno: alunos, aluno_id: ''
									,instrutor_id: '', lista_instrutor: instrutores});
					});		
					
				}
			});
			
			
		},
		pegar_aluno: function(req, res){
			Aluno.findById(req.params.aluno_id, function(err, dados){
				if(err){
					req.redirect('/home');
				}else{
					Aluno.find(function(err, alunos){
						Instrutor.find({setor: 'Instrutor'}, function(err, instrutores){
							res.render('aulas/index_pratica', {aluno_id: dados, lista_aluno: alunos,
						 	instrutor_id: '', lista_instrutor: instrutores});
						});
						
					});
				}
			});
		}
	}
	return aulasPraticasController;
}