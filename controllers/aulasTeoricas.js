module.exports = function(app){

	var Instrutor = app.models.usuario;	
	var Teorico   = app.models.teorico;
	var lista;
	var aulasTeoricasController = {

		index: function(req, res){
			Instrutor.find({setor: 'Instrutor'}, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar Instrutores');
					res.render('aulas/index_teorica');
				}else{
					Teorico.find(function(err, pacotes){
						if(data){
							lista = data;
							res.render('aulas/index_teorica', {lista_instrutor : data, pacote: pacotes});
						}
					});
					
				}
			});
			
		},

		criarPacote: function(req, res){
			var teorico = new Teorico();
			teorico.pacote.nome = req.body.pacoteNome;
			teorico.pacote.dados = false;
			console.log(teorico);
			teorico.save(function(err){
				if(err){
					req.flash('erro', 'Erro ao salvar pacote');
					res.redirect('aulas/teoricas');
				}else{
					req.flash('info', 'Pacote criado');
					Teorico.find(function(err, data){
						if(data){
							pct = data;
							res.render('aulas/index_teorica',{lista_instrutor: lista, pacote: data})
						}
					});
				}
			})
		},

		excluir: function(req, res){
			Teorico.findOne({_id: req.params.id},function(err, data){
				if(data.pacote.dados == true){
					req.flash('erro', 'Pacote contém dados inseridos. Exclusão não permitida!');
					res.redirect('/aulas/teoricas');
				}else{
					
					Teorico.remove({_id: req.params.id}, function(err){
						if(err){
							req.flash('erro', 'Erro ao excluir aluno: '+err);
							res.redirect('/aulas/teoricas');
						}else{
							req.flash('info', 'Registro excluído com sucesso!');
							res.redirect('/aulas/teoricas');
						}
					})
				}
				
			});
		}
	}
	return aulasTeoricasController;
}