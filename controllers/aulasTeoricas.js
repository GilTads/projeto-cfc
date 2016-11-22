module.exports = function(app){

	var moment = require('moment');
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
			teorico.nome = req.body.pacoteNome;
			teorico.dados = false;
			teorico.save(function(err){
				if(err){
					req.flash('erro', 'Erro ao salvar pacote');
					res.redirect('aulas/teoricas');
				}else{
					req.flash('info', 'Pacote criado');
					Teorico.find(function(err, data){
						if(data){
							res.render('aulas/index_teorica',
								{lista_instrutor: lista, pacote: data})
						}
					});
				}
			})
		},
		cronograma: function(req, res){
			Teorico.findOne({_id: req.params.id}, function(err, dados){
				if(err){
					req.flash('erro', 'Erro');
					res.render('aulas/cronograma_teorico',
				 		{teorico: dados, lista_instrutor: lista});
				}else{
					
					res.render('aulas/cronograma_teorico', {teorico: dados, lista_instrutor: lista});
				}
			});
				
				
					
				
		},

		criarCronograma: function(req, res){
			Teorico.findOne({_id: req.params.id}, function(err, dados){
				if(err){
					console.log('Erro ao criar cronograma');
				}else{
					var dataStr	= req.body.data;
					var dia 	= moment(dataStr, 'DD/MM/YYYY');
					dados.pacote._instrutor.push(req.body.instrutor);
					dados.pacote.data.push(dia);
					dados.pacote.disciplina.push(req.body.disciplina);
					dados.pacote.horaIni.push(req.body.dataIniCron);
					dados.pacote.horaFim.push(req.body.dataFimCron);


					dados.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao salvar no banco');
							res.render('aulas/cronograma_teorico',
						 		{teorico: dados, lista_instrutor: lista});
						}else{
							Teorico.findOne({'pacote._instrutor': req.body.instrutor})
								.populate('pacote._instrutor')
								.exec(function(err, aulas){
									if(err){
										req.flash('err', 'Erro ao listar');
										res.render('aulas/cronograma_teorico',
										 {teorico: dados, lista_instrutor: instrutor});
									}else{
										console.log(dados);
										res.render('aulas/cronograma_teorico',
											{teorico: aulas, lista_instrutor: lista})
									}
								});
						}
					});

					
						
				}
			});
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