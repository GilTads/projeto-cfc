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
				}
			});

			Instrutor.find({setor: 'Instrutor'}, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar intrutores');
				}else{
					instrutores = data;
				}
			});

			Veiculo.find(function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar veiculo');
				}else{
					veiculos = data;
				}
			});	
			res.redirect('/aulas/index');
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

		aulaPratica: function(req, res){
			

			Aluno.findOne({_id: req.body.aluno}, function(err, aluno){
				if(err){
					console.log('erro', 'Erro ao buscar aluno');
				} else{
					alunoPop = aluno._id;
					Instrutor.findOne({_id: req.body.instrutor}, function(err, instrutor){
						if(err){
							console.log('erro', 'Erro ao buscar instrutor')
						}else{
							Veiculo.findOne({_id: req.body.veiculo}, function(err, veiculo){
								if(err){
									console.log('erro', 'Erro ao buscar veículo');
								} else{
									var pratico = new Pratico();

									pratico._aluno 		= aluno._id;
									pratico._instrutor 	= instrutor._id;
									pratico._veiculo	= veiculo._id;
									dataStr				= req.body.data;
									
									var data = moment(dataStr, 'DD-MM-YYYY HH:mm');
									console.log("Data: ", data);
									data = data;
									pratico.data = data;
									pratico._aluno.nome 	= aluno.nome,
									pratico._instrutor.nome = instrutor.nome,
									pratico._veiculo.nome	= veiculo.nome
									console.log('O pratico: ', pratico);


									pratico.save(function(err){
										if(err){
											req.flash('erro', 'Aula não pode ser salva');
											console.log(err);
											res.redirect('/aulas/index');
										}else{
											//Popula a collection aula com os dados do aluno
											Pratico
											.findOne({
												'_aluno'		: aluno._id,
												'_instrutor'	: instrutor._id,
												'_veiculo'		: veiculo._id
											})
											.populate('_aluno')
											.populate('_instrutor')
											.populate('_veiculo')
											.exec(function(err, aula){
												if(err){
													req.flash('erro', 'Deu pau no populate');
													res.redirect('/aulas/index');
												}
												// console.log('Pelo menos isso: ',
												// 'Instru: ',aula._instrutor.nome,
												// 'Aluno: ', aula._aluno.nome,'Veic: ', aula._veiculo.nome);

												// //Popula o array de aulas praticas da collection Aluno
												// aluno.aula.pratica.push(aula);
												// aluno.save(function(err){
												// 	if(err) console.log('Erro no cb');
												// 	// console.log('Aluno: ',aula._aluno.nome,
												// 	// 	'Instrutor: ', aula._instrutor.nome,
												// 	// 	'Veiculo: ', aula._veiculo.nome);
												// });
												// Aluno
												// .findOne({'aula.pratica': aula._id})
												// .populate('aula.pratica')
												// .exec(function(err, aula){
												// 	if(err) console.log('Erro na aula do schema aluno');
												// 	console.log(JSON.stringify(aluno.aula.pratica._aluno, null, "\t"));
												// });
											});

											

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

		testePop: function(req, res){

			
			Pratico.findOne({'_veiculo':"580ab668afac4f7b72bbab99"})
			.populate('_aluno')
			.populate('_instrutor')
			.populate('_veiculo')
			.exec(function(err, aula){
				var diaStr = aula.data.getDate();
				var mesStr = aula.data.getMonth()+1;
				var anoStr = aula.data.getFullYear();
				var hora   = aula.data.getHours();
				var min = aula.data.getMinutes();
				if(aula) console.log('Dia: ',diaStr, 'Mes: ',mesStr, 'Ano: ',anoStr,
				 'hora: ',hora, ' Min: ', min, "Aula Agendada: ", aula._instrutor.nome );
				
			});


			// TESTE DE BUSCA FAKE 

			// Pratico.find({$and: [{'_aluno.nome': 'Gilmar'},
			//  {'_instrutor.nome' : 'João'}]},function(err, aula){
			// 	if(aula) console.log(aula);
			// });

			//Conta quantas vezes existe o documento no banco

			// Pratico.count({_aluno: "57ef2755ab0d7a494540916a"}, function(err,c){
			// 	if(!err) console.log('Count is: ', c);
			// })

		}
	
	}
	return aulasPraticasController;
}