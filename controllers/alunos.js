module.exports = function(app){

	var Aluno = app.models.aluno;
	var validacao = require('../validators/alunos');
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
		}, 

		cadastro: function(req, res){
			res.render('alunos/cadastrar', {aluno : new Aluno()});
		},

		create: function(req, res){
			if(validacao(req,res)){
				var modelo 			   	= new Aluno();
				modelo.nome 		   	= req.body.nome;
				modelo.nasc 		   	= req.body.nasc;
				modelo.rg 				= req.body.rg;
				modelo.cpf 				= req.body.cpf;
				modelo.renach			= req.body.renach;
				modelo.email 			= req.body.email;
				modelo.sexo 			= req.body.sexo;
				modelo.pais.pai 		= req.body.pai;
				modelo.pais.mae 		= req.body.mae;
				modelo.endereco.rua 	= req.body.rua;
				modelo.endereco.numero 	= req.body.numero;
				modelo.endereco.bairro 	= req.body.bairro;
				modelo.endereco.cep 	= req.body.cep;
				modelo.endereco.cidade 	= req.body.cidade;
				modelo.endereco.uf 		= req.body.uf;
				modelo.telefones.res 	= req.body.res;
				modelo.telefones.cel 	= req.body.cel;
				modelo.telefones.opc 	= req.body.opc;
				modelo.qnt_aulas.carro 	= 25;
				modelo.qnt_aulas.moto 	= 20;
				modelo.categoria 		= req.body.categoria;

				Aluno.findOne({'cpf' : modelo.cpf}, function(err, data){
					if(data){
						req.flash('erro', 'CPF já cadastrado');
						res.render('alunos/cadastrar', {aluno: modelo});
					}else{
						modelo.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar aluno: ' + err);
								res.render('alunos/cadastrar', {aluno: req.body});
							}else{
								req.flash('info', 'Aluno cadastrado com sucesso!');
								res.redirect('/alunos');
							}
						});
					}
				});
			}else{
				res.render('alunos/cadastrar', {aluno: req.body});
			}
		},

		listar: function(req, res){
			Aluno.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao listar Alunos');
				}else{
					res.render('alunos/listar', {aluno: data});
				}
			});
		},

		update: function(req, res){
			console.log(req.body.nasc);
				Aluno.findById(req.params.id, function(err, data){
					var modelo 				= data;
					modelo.nome 			= req.body.nome;
					modelo.cpf 				= req. body.cpf;
					modelo.rg 				= req.body.rg;
					modelo.nasc 			= req.body.nasc;
					modelo.renach 			= req.body.renach;
					modelo.email 			= req.body.email;
					modelo.sexo 			= req.body.sexo;
					modelo.qnt_aulas.carro  = req.body.aula_carro;
					modelo.qnt_aulas.moto 	= req.body.aula_moto;
					modelo.telefones.cel 	= req.body.cel;
					modelo.telefones.res 	= req.body.res;
					modelo.telefones.opc 	= req.body.opc;
					modelo.pais.pai 		= req.body.pai;
					modelo.pais.mae 		= req.body.mae;
					modelo.endereco.rua 	= req.body.rua;
					modelo.endereco.numero 	= req.body.numero;
					modelo.endereco.bairro 	= req.body.bairro;
					modelo.endereco.cep 	= req.body.cep;
					modelo.endereco.uf 		= req.body.uf;
					modelo.endereco.cidade 	= req.body.cidade;
					modelo.categoria 		= req.body.categoria;
					console.log(req.body.nasc);
					modelo.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao atualizar os dados: ' + err);
						}else{
							req.flash('info', 'Registro atualizado com sucesso!');
							res.redirect('/alunos');
						}
					});

				});
			
		},

		excluir: function(req, res){
			Aluno.remove({_id: req.params.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir aluno: '+err);
					res.redirect('/alunos');
				}else{
					req.flash('info', 'Registro excluído com sucesso!');
					res.redirect('/alunos');
				}
			});
		},
		// ROTA PARA TESTES DE AJAX
		ajaxing: function(req, res){
			Aluno.findOne({nome: req.body.nome}, function(err, data){
				if(err){
					res.send('nada encontrado');
				}else{
					res.send(data);
				}
			});
		},

		busca: function(req, res){
			Aluno.findOne({cpf: req.body.cpf}, function(err, data){
				if(err){
					res.send('Aluno não encontrado');
				}else{
					res.send(data);
				}
			});
		}
		
	}
	return AlunoController;
}