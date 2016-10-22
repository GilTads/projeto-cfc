module.exports = function(app){

	var Aluno 	  	= app.models.aluno;
	var Instrutor 	= app.models.usuario;
	var Veiculo	  	= app.models.veiculo;
	var Pratico		= app.models.pratico;
	var alunos
	   ,instrutores
	   ,veiculos
	   ,aluno_input
	   ,instrutor_input
	   ,veiculo_input





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
				veiculo		   : '',
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

		aulaPratica: function(req, res){
			var aluno 	  = req.body.aluno
			,	instrutor = req.body.instrutor
			,	veiculo   = req.body.veiculo
			, 	data 	  = req.body.dataToMongo;
			
			Aluno.findOne({cpf: aluno}, function(err, dados){
				if(err){
					res.send('erro', 'Erro ao buscar aluno');
				}else{
					var pratico = new Pratico();
					pratico._aluno = dados._id;
					pratico.save(function(err){
						if(err){
							console.log('Não salvou');
						}else{
							console.log('Deu certo');
							console.log(this);
							// Pratico
							// .populate('_aluno')
							// .exec(function(err, aula){
							// 	if(err) return handleError(err);
							// 	console.log('O aluno é: ', aula._aluno.nome);
							// });
						}
					});
				}
			});

			Instrutor.findOne({_id: instrutor}, function(err, dados){
				if(err){
					res.send('erro', 'Erro ao buscar instrutor');
				}else{
					idInstrutor = dados._id;
				}
			});

			Veiculo.findOne({_id: veiculo}, function(err, dados){
				if(err){
					res.send('erro', 'Erro ao buscar veículo');
				}else{
					idVeiculo = dados._id;
				}
			});		
		

			// AulaPratica
			// .populate('_aluno')
			// .populate('_instrutor')
			// .populate('_veiculo')
			// .exec(function(err, aulas){
			// 	if(err) return handleError(err);
			// 	console.log('O aluno é: ', modelo._aluno.nome);
			// });


		}
	
	}
	return aulasPraticasController;
}