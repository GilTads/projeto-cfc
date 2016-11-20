module.exports = function(app){

	var moment = require('moment');
	var Aluno 	  	= app.models.aluno;
	var Instrutor 	= app.models.usuario;
	var Veiculo	  	= app.models.veiculo;
	var Pratico		= app.models.pratico;
	var alunos
	   ,instrutores
	   ,veiculos
	   ,aluno_input
	   ,instrutor_input
	   ,veiculo_input;




	var aulasPraticasController = {
		refresh: function(req, res){
			Aluno.find(function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar aluno');
				}else{
					alunos = data;
					Instrutor.find({setor: 'Instrutor'}, function(err, data){
						if(err){
							req.flash('erro', 'Erro ao buscar intrutores');
						}else{
							instrutores = data;
							Veiculo.find(function(err, data){
								if(err){
									req.flash('erro', 'Erro ao buscar veiculo');
								}else{
									veiculos = data;
									res.redirect('/aulas/index');
								}
							});	
						}
					});
				}
			});

			
		},
		index: function(req, res){
			aluno_input    = '';
			instrutor_input= '';
			veiculo_input  = '';
			res.render('aulas/index_pratica',{
				lista_instrutor: instrutores,
				lista_aluno	   : alunos,
				lista_veiculo  : veiculos,
				instrutor 	   : '',
				aluno 		   : '',
				veiculo		   : ''
			});
		},

		//INUTILIZADO
		seleciona_aluno: function(req, res){
			Aluno.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar aluno');
				}else{
					aluno_input = dados; // Guarda o nome do aluno para ser usado no input fora do form
					res.render('aulas/index_pratica',{
						aluno 			: dados,
						lista_instrutor : instrutores,
						lista_aluno		: alunos,
						lista_veiculo	: veiculos,
						instrutor 		: instrutor_input || '',
						veiculo 		: veiculo_input   || ''
					});
				}
			});
		},
		//INUTILIZADO
		seleciona_instrutor: function(req, res){
			Instrutor.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar instrutor');
				}else{
					instrutor_input = data;
					res.render('aulas/index_pratica', {
						instrutor 		: data,
						lista_instrutor : instrutores,
						lista_aluno		: alunos,
						lista_veiculo	: veiculos,
						aluno 			: aluno_input 	  || '',
						veiculo 		: veiculo_input   || ''
					});
				}
			});	
		},
		//INUTILIZADO
		seleciona_veiculo: function(req, res){
			Veiculo.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar veículo');
				}else{
					veiculo_input = data;
					res.render('aulas/index_pratica', {
						veiculo 		: data,
						lista_aluno		: alunos,
						lista_instrutor : instrutores,
						lista_veiculo 	: veiculos,
						aluno 			: aluno_input 	  || '',
						instrutor 		: instrutor_input || ''
					});
				}
			});
		},

		buscaId: function(req, res){
			Aluno.findOne({cpf: req.body.aluno}, function(err, aluno){
				if(err){
					console.log('erro', 'Erro ao buscar aluno');
				} else{
					Instrutor.findOne({_id: req.body.instrutor}, function(err, instrutor){
						if(err){
							console.log('erro', 'Erro ao buscar instrutor')
						}else{
							Veiculo.findOne({_id: req.body.veiculo}, function(err, veiculo){
								if(err){
									console.log('erro', 'Erro ao buscar veículo');
								} else{
									res.send({aluno, instrutor, veiculo});
								}
							});
						}
					});
				}
			});
		},
		verificaAulaAluno: function(req, res){
			Aluno.findOne({cpf: req.body.cpf}, function(err, aluno){
				if(aluno){
					res.send(aluno);
				}else{
					return;
				}

			});
		},
		verificaAulaInstrutor: function(req, res){
			Instrutor.findOne({_id: req.body.id}, function(err, instrutor){
				if(instrutor){
					res.send(instrutor);
				}else{
					return;
				}
			});
		},
		verificaAulaVeiculo: function(req, res){
			Veiculo.findOne({_id: req.body.id}, function(err, veiculo){
				if(veiculo){
					res.send(veiculo);
				}else{
					return;
				}
			});
		},

		aulaPratica: function(req, res){	
			Aluno.findOne({_id: req.body.aluno}, function(err, aluno){
				if(err){
					console.log('erro', 'Erro ao buscar aluno');
				} else{
					Instrutor.findOne({_id: req.body.instrutor}, function(err, instrutor){
						if(err){
							console.log('erro', 'Erro ao buscar instrutor')
						}else{
							Veiculo.findOne({_id: req.body.veiculo}, function(err, veiculo){
								if(err){
									console.log('erro', 'Erro ao buscar veículo');
								} else{
									if(veiculo.categoria == 'A'){
										if(aluno.qnt_aulas.moto == 0){
											req.flash('erro', 'Saldo de aulas de moto insuficiente');
											res.redirect('/aulas/index');
											return;
										}else if(aluno.qnt_aulas.carro == 0){
											req.flash('erro', 'Saldo de aulas de carro insuficiente');
											res.redirect('/aulas/index');
											return;
										}else{
											aluno.qnt_aulas.moto -= 1;
										}
										
									}else{
										aluno.qnt_aulas.carro -= 1;
									}
									var pratico = new Pratico();

									pratico._aluno 		= aluno._id;
									pratico._instrutor 	= instrutor._id;
									pratico._veiculo	= veiculo._id;
									dataStr				= req.body.data;
									
									var data = moment(dataStr, 'DD-MM-YYYY HH:mm');
								
									pratico.data = data;
									pratico._aluno.nome 	= aluno.nome;
									pratico._instrutor.nome = instrutor.nome;
									pratico._veiculo.nome	= veiculo.nome;

									aluno.horario.pratico.push(data);
									instrutor.horario.pratico.push(data);
									veiculo.horario.pratico.push(data);

									

									aluno.save(function(err){
										if(!err) console.log('Salvou no horario aluno');
									});
									instrutor.save(function(err){
										if(!err) console.log('Salvou no horario instrutor');
									});
									veiculo.save(function(err){
										if(!err) console.log('Salvou no horario veículo');
									});
									
									pratico.save(function(err){
										if(err){
											req.flash('erro', 'Aula não pode ser salva');
											console.log(err);
											res.redirect('/aulas/index');
										}else{
											req.flash('info', 'Aula agendada com sucesso');
											res.redirect('/aulas/index');
		
										}
									});
								}
							});
						}
					});
				}
			});

		},
		aulaAluno: function(req, res){
			Aluno.findOne({cpf: req.body.cpfA}, function(err, aluno){
				if(aluno === null){
					req.flash('erro', 'Aluno não encontrado');
					res.redirect('/aulas/index');
				}else{
					var ini = req.body.dataIniAluno;
					var fimStr = req.body.dataFinAluno;
					var dataIni = moment(ini, 'DD-MM-YYYY');
					var dataFim = moment(fimStr, 'DD-MM-YYYYHH:mm:ss');
					//AVANÇA UM DIA NO CALENDARIO PARA O $lte FUNCIONAR
					dataFim = moment(dataFim).add(24, 'hours').format('LLL');
					Pratico.find({'_aluno': aluno._id, data:{'$gte': dataIni, '$lte': dataFim}})
					.sort('data')
					.populate('_aluno')
					.populate('_instrutor')
					.populate('_veiculo')
					.exec(function(err, aulas){
						if(err){
							req.flash('err', 'Falha ao gerar relatório');
						}else{
							res.render('aulas/aluno', {dados: aulas});
						}
					});
					
				}
			});
		},
		aulaInstrutor: function(req, res){
			Instrutor.findOne({_id: req.body.cInstrutor}, function(err, instrutor){
				console.log(req.body.cInstrutor);
				if(instrutor === null){
					req.flash('erro', 'Instrutor não encontrado');
					res.redirect('/aulas/index');
				}else{
					var ini = req.body.dataIniAluno;
					var fimStr = req.body.dataFinAluno;
					var dataIni = moment(ini, 'DD-MM-YYYY');
					var dataFim = moment(fimStr, 'DD-MM-YYYYHH:mm:ss');
					//AVANÇA UM DIA NO CALENDARIO PARA O $lte FUNCIONAR
					dataFim = moment(dataFim).add(24, 'hours').format('LLL');
					Pratico.find({'_instrutor': instrutor._id})
					.sort('data')
					.populate('_aluno')
					.populate('_instrutor')
					.populate('_veiculo')
					.exec(function(err, aulas){
						if(err){
							req.flash('err', 'Falha ao gerar relatório');
						}else{
							res.render('aulas/instrutor', {dados: aulas});
						}
					});
				}
			});
		},
		aulaVeiculo: function(req, res){
			Veiculo.findOne({_id: req.body.cVeiculo}, function(err, veiculo){
				console.log(req.body.cInstrutor);
				if(veiculo === null){
					req.flash('erro', 'Veículo não encontrado');
					res.redirect('/aulas/index');
				}else{
					var ini = req.body.dataIniAluno;
					var fimStr = req.body.dataFinAluno;
					var dataIni = moment(ini, 'DD-MM-YYYY');
					var dataFim = moment(fimStr, 'DD-MM-YYYYHH:mm:ss');
					//AVANÇA UM DIA NO CALENDARIO PARA O $lte FUNCIONAR
					dataFim = moment(dataFim).add(24, 'hours').format('LLL');
					Pratico.find({'_veiculo':veiculo._id})
					.sort('data')
					.populate('_aluno')
					.populate('_instrutor')
					.populate('_veiculo')
					.exec(function(err, aulas){
						if(err){
							req.flash('err', 'Falha ao gerar relatório');
						}else{
							res.render('aulas/veiculo', {dados: aulas});
						}
					});
				}
			});
		},
		excluir: function(req, res){
			Pratico.findOne({_id: req.params.id}, function(err, aula){
				if(err){
					req.flash('erro', 'Falha ao Excluir');
				}else{
					var h = aula.data;
					//EXCLUI A AULA DO CAMPO HORARIO AULA DA COLLECTION ALUNO
					Aluno.update({_id: aula._aluno},
					 {$pull: {'horario.pratico':{ $in: [h]}}},
					 {multi: true},function(err){
						if(err) {
							req.flash('err', 'Erro ao excluir aula do aluno');
							res.redirect('/aulas/index');
						}else{
							Aluno.findOne({_id: aula._aluno}, function(err, aluno){
								if(aluno){
									Veiculo.findOne({_id: aula._veiculo}, function(err, veiculo){
										if(veiculo){
											if(veiculo.categoria == 'A'){
												aluno.qnt_aulas.moto += 1;
											}else if(veiculo.categoria =='B'){
												aluno.qnt_aulas.carro += 1;
											}
											aluno.save(function(err){
												if(!err){
													console.log('Estornou a aula');
												}
											});
										}

									});

								}
								
							});	
						}
					});
					Veiculo.update({_id: aula._veiculo},
					 {$pull: {'horario.pratico':{ $in: [h]}}},
					 {multi: true},function(err){
						if(err) {
							req.flash('err', 'Erro ao excluir aula do veiculo');
							res.redirect('/aulas/index');
						}
					});
					Instrutor.update({_id: aula._instrutor},
					 {$pull: {'horario.pratico':{ $in: [h]}}},
					 {multi: true},function(err){
						if(err) {
							req.flash('err', 'Erro ao excluir aula do instrutor');
							res.redirect('/aulas/index');
						}
					});

					Pratico.remove({_id: req.params.id}, function(err){
						if(err){
							req.flash('erro', 'Erro ao excluir aluno: '+err);
							res.redirect('/aulas/index');
						}else{
							req.flash('info', 'Aula excluída com sucesso!');
							res.redirect('/aulas/index');
						}
					});
				}
			});

		},
	
	}
	return aulasPraticasController;
}