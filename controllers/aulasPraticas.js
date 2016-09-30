module.exports = function(app){

	var Aluno = app.models.aluno;
	var Instrutor = app.models.usuario;

	var aulasPraticasController = {
		index: function(req, res){

			Aluno.find(function(err, alunos){
				if(err){
					req.redirect('/home');
				}else{
					// Instrutor.find({setor: 'Instrutor'},function(err, instrutores){
					// 	if(err){
					// 		req.redirect('/home');
					// 	}else{}
							
						
					// });
					// res.render('aulas/index_pratica', {aluno: alunos, instrutor: instrutores});
					res.render('aulas/index_pratica', {aluno: alunos, aluno_id: ''});
				}
			});
			
			
		},
		pegar: function(req, res){
			Aluno.findById(req.params.aluno_id, function(err, dados){
				if(err){
					req.redirect('/home');
				}else{
					Aluno.find(function(err, alunos){
						res.render('aulas/index_pratica', {aluno_id: dados, aluno: alunos});
					});
					
				}
				
			});
		}
	}
	return aulasPraticasController;
}