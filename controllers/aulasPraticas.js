module.exports = function(app){

	var Aluno = app.models.aluno;
	var Instrutor = app.models.usuario;
	var alunos
	   ,instrutores
	   ,aluno_input =''
	   ,instrutor_input =''

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


	var aulasPraticasController = {
		index: function(req, res){
			res.render('aulas/index_pratica',{
				lista_instrutor: instrutores,
				lista_aluno	   : alunos,
				instrutor 	   : instrutor_input || '',
				aluno 		   : aluno_input || ''
			});
		},

		seleciona_aluno: function(req, res){
			Aluno.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar aluno');
				}else{
					aluno_input = dados; // Guarda o nome do aluno para ser usado no input fora do form
					console.log('Aluno_input: '+ aluno_input);
					res.render('aulas/index_pratica',{
						lista_instrutor : instrutores,
						lista_aluno		: alunos,
						aluno 			: dados,
						instrutor 		: instrutor_input || ''
					});
				}
			});
		},

		seleciona_instrutor: function(req, res){
			Instrutor.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar instrutor');
				}else{
					instrutor_input = data;
					console.log('INstrutor_input: '+ instrutor_input);
					res.render('aulas/index_pratica', {
						lista_instrutor : instrutores,
						lista_aluno		: alunos,
						instrutor 		: data,
						aluno 			: aluno_input || ''
					});
				}
			});	
		}
	
	}
	return aulasPraticasController;
}