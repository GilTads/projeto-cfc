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
						 ini: ini, fim: fimStr, _idAluno: idAluno});
					
				}
			});		
		},

		criarPacote: function(req, res){
			var teorico = new Teorico();
			var dataStr	= req.body.data;
			var dia 	= moment(dataStr, 'DD/MM/YYYY');

			teorico.data 	   	= dia;
			teorico._instrutor 	= req.body.instrutor;
			teorico.horaIni 	= req.body.dataIniCron;
			teorico.horaFim 	= req.body.dataFimCron;
			teorico.disciplina 	= req.body.disciplina;


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
			Aluno.findOne({_id: req.body.idAluno}, function(err, aluno){
				if(err){
					req.flash('erro', 'Aluno já agendado para esta aula');
					res.redirect('/aulas/teoricas');
				}else{
					for(i in req.body.ch){
						aluno.horario.teorico.push(req.body.ch[i]);
						Teorico.findOne({_id: req.body.ch[i]}, function(err, teorico){
							if(teorico){
								teorico.alunos.push(aluno._id);
								teorico.save(function(err){
									if(!err) console.log('gravou no teorico');
								});
							}
						});

					}
					
					aluno.save(function(err){
						req.flash('info', 'Aula agendada!');
						res.send(aluno);
						// res.render('aulas/index_teorica',
						// 	{lista_instrutor: instrutores,
						//  	teorico: '',aluno: alunos});
					});
				}
				
			});
		},
		relatorioAlunoRender: function(req, res){
			Aluno.find(function(err, alunos){
				if(alunos){
					res.render('aulas/relatorioTeoricoAluno',{aluno: alunos, lista: '', al: ''})
				}else{
					req.flash('erro',  'Nenhum aluno encontrado');
				}
			});
			
		},
		relatorioAluno: function(req, res){
			var id = req.body.alunos;
			var nome;
			Aluno.findOne({'_id': id}, function(err, aluno){
				if(aluno){
					nome = aluno.nome;
				}
			});
			Teorico.find({'alunos': {$in: [id]}})
			.populate('_instrutor')
			.sort('data')
			.exec(function(err, aulas){
				if(aulas){
					idAluno = id;
					res.render('aulas/relatorioTeoricoAluno',{lista: aulas,
						aluno: alunos, al: nome});
				}
			});
		},

		excluirAulaAluno: function(req, res){
			var idTeorico = req.params.id;
			Teorico.findOne({'_id': idTeorico}, function(err, teorico){
				console.log('Olha o id teorico aqui: ', teorico._id);
				if(err){
					req.flash('erro', 'Erro ao excluir aula teórica do aluno');
				}else{

					Aluno.findOne({'_id': idAluno}, function(err, aluno){
						if(err){
								req.flash('erro', 'Não foi possível excluir');
						}else{
							teorico.update({$pull: {'alunos': {$in: [idAluno]}}}, function(err){
								if(err){
									req.flash('erro', 'Não foi possível atualizar');
									res.render('aulas/relatorioTeoricoAluno',
											{aluno: alunos, lista: '', al: ''})
								}else{


									aluno.update({$pull: {'horario.teorico':{ $in: [idTeorico]}}}
										,function(err){
											if(err){
												req.flash('erro', 'Não foi possível atualizar');
												res.render('aulas/relatorioTeoricoAluno',
													{aluno: alunos, lista: '', al: ''})
											}else{
												teorico.save();
												aluno.save();
												res.render('aulas/relatorioTeoricoAluno',
													{aluno: alunos, lista: '', al: ''})
										}

										
									});
								}
							});
						}
					});
				
				}
			})
		},

		excluir: function(req, res){
			Teorico.findOne({_id: req.params.id ,'alunos': {$exists:true, $ne: []}},function(err, data){
				if(err){
					req.flash('erro', 'Pacote contém alunos inseridos. Exclusão não permitida!',err);
					res.redirect('/aulas/teoricas');
				}else if(data){
					req.flash('erro', 'Pacote contém alunos inseridos. Exclusão não permitida!');
					
					res.redirect('/aulas/teoricas');
				}else{
					req.flash('info', 'Exclusão realizada com sucesso!');
						Teorico.remove({_id: req.params.id}, function(err){
						if(err){
							req.flash('erro', 'Pacote contém alunos inseridos. Exclusão não permitida!');
							res.redirect('/aulas/teoricas');
						}else{
							req.flash('info', 'Registro excluído com sucesso!');
							res.redirect('/aulas/teoricas');
						}
					});
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