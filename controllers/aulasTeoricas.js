module.exports = function(app){

	var moment = require('moment');
	var Aluno  = app.models.aluno;
	var Instrutor = app.models.usuario;	
	var Teorico   = app.models.teorico;
	var instrutores
	   ,alunos
	   ,idAluno;
	var aulasTeoricasController = {

		index: function(req, res){
			Aluno.find(function(err, dados){
				if(err){
					req.flash('err', 'Não existem alunos cadastrados');
					res.render('/alunos');
				}else{
					alunos = dados; 
					Instrutor.find({setor: 'Instrutor'}, function(err, instrutor){
						if(err){
							req.flash('erro', 'Erro ao buscar Instrutores');
							res.render('aulas/index_teorica');
						}else{
							instrutores = instrutor;
							res.render('aulas/index_teorica', 
								{lista_instrutor: instrutor, teorico: '',
								 aluno: dados});
						}
					});
				}
			});	
			
			
		},
		cronograma: function(req, res){
			Teorico.find({})
			.populate('_instrutor')
			.sort('data')
			.exec(function(err, aula){
				if(aula){
					res.render('aulas/cronograma_teorico', 
						{lista_instrutor: instrutores,
						 teorico: ''});
					
				}
			});
		},

		buscarAulas: function(req, res){
			var nome;
			Aluno.findOne({_id: req.body.alunos}, function(err, _aluno){
				if(_aluno){
					nome = _aluno.nome;
					idAluno = _aluno._id;
				}
			});
			var ini = req.body.dIni;
			var fimStr = req.body.dFim;
			var dataIni = moment(ini, 'DD-MM-YYYY');
			var dataFim = moment(fimStr, 'DD-MM-YYYY');
			Teorico.find({data:{'$gte': dataIni, '$lte': dataFim}})
			.populate('_instrutor')
			.sort('data')
			.exec(function(err, aula){
				if(aula){
					res.render('aulas/index_teorica', 
						{lista_instrutor: instrutores, teorico: aula,
						 aluno: alunos, name: nome,
						 ini: ini, fim: fimStr});
					
				}
			});		
		},

		criarPacote: function(req, res){
			var teorico = new Teorico();
			var dataStr	= req.body.data;
			var dia 	= moment(dataStr, 'DD/MM/YYYY');

			teorico.data = dia;
			teorico._instrutor = req.body.instrutor;
			teorico.horaIni = req.body.dataIniCron;
			teorico.horaFim = req.body.dataFimCron;
			teorico.disciplina = req.body.disciplina;


			teorico.save(function(err){
				if(err){
					req.flash('erro', 'Erro ao salvar pacote');
					res.redirect('aulas/teoricas');
				}else{
					req.flash('info', 'Pacote criado');
					Teorico.find({})
						.populate('_instrutor')
						.sort('data')
						.exec(function(err, aula){
							if(aula){
								res.render('aulas/cronograma_teorico', 
									{lista_instrutor: instrutores, teorico: aula, aluno: alunos});
								
							}
						});
				}
			})
		},
		buscarCronograma: function(req, res){
			var ini = req.body.dIni;
			var fimStr = req.body.dFim;
			var dataIni = moment(ini, 'DD-MM-YYYY');
			var dataFim = moment(fimStr, 'DD-MM-YYYY');
			Teorico.find({data:{'$gte': dataIni, '$lte': dataFim}})
			.populate('_instrutor')
			.sort('data')
			.exec(function(err, aula){
				if(aula){
					res.render('aulas/cronograma_teorico', 
						{lista_instrutor: instrutores, teorico: aula,
						 aluno: alunos, ini: ini, fim: fimStr});
					
				}
			});		
		},
		agendar: function(req, res){
			Aluno.findOne({_id: idAluno}, function(err, aluno){
				if(!err){
					aluno.horario.teorico.push(req.body.ch);
					aluno.save(function(err){
						req.flash('info', 'Aula agendada!');
						res.render('aulas/index_teorico',
							{lista_instrutor: instrutores,
						 	teorico: ''});
					});
				}else{
					console.log('Deu merda',nomeAl);
				}
			});
			console.log(req.body.ch);
		},

		excluir: function(req, res){
			Teorico.findOne({_id: req.params.id},function(err, data){
				if(err){
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






		
		// cronograma: function(req, res){
		// 	Teorico.findOne({_id: req.params.id}, function(err, dados){
		// 		if(err){
		// 			req.flash('erro', 'Erro');
		// 			res.render('aulas/cronograma_teorico',
		// 		 		{teorico: dados, lista_instrutor: lista});
		// 		}else{
					
		// 			res.render('aulas/cronograma_teorico', {teorico: dados, lista_instrutor: lista});
		// 		}
		// 	});
				
				
					
				
		// },

		// criarCronograma: function(req, res){
		// 	Teorico.findOne({_id: req.params.id}, function(err, dados){
		// 		if(err){
		// 			console.log('Erro ao criar cronograma');
		// 		}else{
		// 			var dataStr	= req.body.data;
		// 			var dia 	= moment(dataStr, 'DD/MM/YYYY');
		// 			dados.pacote._instrutor.push(req.body.instrutor);
		// 			dados.pacote.data.push(dia);
		// 			dados.pacote.disciplina.push(req.body.disciplina);
		// 			dados.pacote.horaIni.push(req.body.dataIniCron);
		// 			dados.pacote.horaFim.push(req.body.dataFimCron);


		// 			dados.save(function(err){
		// 				if(err){
		// 					req.flash('erro', 'Erro ao salvar no banco');
		// 					res.render('aulas/cronograma_teorico',
		// 				 		{teorico: dados, lista_instrutor: lista});
		// 				}else{
		// 					res.render('aulas/cronograma_teorico',
		// 									{teorico: dados, lista_instrutor: lista})
		// 				}
		// 			});

					
						
		// 		}
		// 	});
		// },