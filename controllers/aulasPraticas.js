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
							console.log(' Deu Galho :( ');
						}else{
							res.render('aulas/index_pratica',{
								lista_instrutor: instrutor,
							    lista_aluno	   : alunos,
								instrutor 	   : '',
								aluno 		   : ''
							});
						}
					});
				}
			});

			
		},

		seleciona: function(req, res){
			var aluno = req.body.aluno;
			console.log(aluno);
			
		}
	
	}
	return aulasPraticasController;
}