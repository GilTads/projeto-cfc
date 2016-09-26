module.exports = function(app){

	var Aluno = app.models.aluno;

	var AlunoController = {

		index: function(req, res){
			Aluno.find(function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar alunos: '+ err);
					 req.redirect('/alunos');
				} else{
					res.render('alunos/index', {lista: dados});
				}
			});
		}
	}
	return AlunoController;
}