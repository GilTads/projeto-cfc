module.exports = function(app){

	var validacao = require('../validators/usuarios');
	var Usuario   = app.models.usuario;

	var UsuarioController = {
		cadastro: function(req,res){
			res.render('usuarios/cadastro', {usuario : new Usuario()});
		},
		index: function(req,res){
			Usuario.find(function(err,dados){
				if(err){
					req.flash('erro', 'Erro ao buscar usuários: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/index', {lista: dados});
				}
			});			
		},

		create: function(req,res){
			if(validacao(req,res)){
				var modelo 		= new Usuario();
				modelo.nome 	= req.body.nome;
				modelo.sobrenome= req.body.sobrenome;
				modelo.email 	= req.body.email;
				modelo.senha 	= modelo.generateHash(req.body.senha);
				modelo.rg 		= req.body.rg;
				modelo.cpf 		= req.body.cpf;
				modelo.fone 	= req.body.fone;
				modelo.cel 		= req.body.cel;
				modelo.setor 	= req.body.setor;

				Usuario.findOne({'email' : modelo.email}, function(err,data){
					if(data){
						req.flash('erro', 'Email já cadastrado, tente outro.');
						res.render('usuarios/cadastro', {usuario : modelo});
					}
				});

				Usuario.findOne({'cpf' : modelo.cpf}, function(err, data){
					if(data){
						req.flash('erro', 'CPF já cadastrado.');
						res.render('usuarios/cadastro', {usuario : modelo});
					}else{
						modelo.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar: '+err);
								res.render('usuarios/cadastro', {usuario : req.body});
							}else {
								req.flash('info', 'Usuário cadastrado com sucesso!');
								res.redirect('/usuarios');
							}
						});
					}
				});

			}else{
				res.render('usuarios/cadastro', {usuario : req.body});
			}
		},
		listar: function(req,res){
			Usuario.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao exibir usuário: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/listar', {dados: dados});
				}
			});
		},

		editar: function(req, res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao editar: '+err);
					res.redirect('usuarios');
				}else{
					res.render('usuarios/editar', {usuario: data});
				}
			});
		},
		update: function(req, res){
			if(validacao(req, res)){
				Usuario.findById(req.params.id, function(err, data){
					console.log('ID: '+ req.params.id);
					var modelo		 = data;
					modelo.nome 	 = req.body.nome;
					modelo.sobrenome = req.body.sobrenome; 
					modelo.email 	 = req.body.email;
					modelo.rg 		 = req.body.rg;
					modelo.cpf 		 = req.body.cpf;
					modelo.fone 	 = req.body.fone;
					modelo.cel 		 = req.body.cel;
					modelo.setor 	 = req.body.setor;

					modelo.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao atualizar os dados: ' + err);
						}// VERIFICA SE O USUARIO EDITADO É O MESMO DA SESSÃO. SE FOR ATUALIZA A SESSÃO
						else{
							if(req.session.usuario._id == req.params.id){
								req.session.usuario = data;
								res.redirect('/usuarios');
							}else{
								req.flash('info', 'Registro atualizado com sucesso!');
								res.redirect('/usuarios');
							}
						}
					});
				});
			}else{
				res.render('usuarios/editar/:id', {usuario: req.body});
			}
		},

		excluir: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir usuário: '+err);
					res.redirect('/usuarios');
				}// VERIFICA SE O USUARIO EDITADO É O MESMO DA SESSÃO. SE FOR ENCERRA A SESSÃO
				else{
					if(req.session.usuario._id == req.params.id){
						req.session.destroy();
						res.redirect('/login');
					}else{
						req.flash('info', 'Registro excluído com sucesso!');
						res.redirect('/usuarios');
					}
				}
			});
		}
	
	}	
	return UsuarioController;
}