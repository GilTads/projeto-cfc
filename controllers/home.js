module.exports = function(app){

	var Usuario   = app.models.usuario;
	var validacao = require('../validators/autenticacao');

	var HomeController ={
		index: function(req, res){
			res.render('home/index');
		},
		home: function(req,res){
			if(req.session.usuario.setor == 'Instrutor'){ //A partir daqui darei as devidas permissões para os users
				res.send('Coitado de voce');
			}else
			res.render('home/home');
		},
		loginPage: function(req, res){
			res.render('home/login');
		},
		
		autenticacao: function(req,res){
			var usuario = new Usuario();
			var email 	= req.body.email;
			var senha 	= req.body.senha;

			if(validacao(req,res)){
				Usuario.findOne({'email': email}, function(err, data){
					if(err){
						req.flash('erro', 'Erro ao acessar o sistema: ' + err);
						res.redirect('/login');
					}else if(!data){
						req.flash('erro', 'Usuário não cadastrado!');
						res.redirect('/login');
					}else if(!usuario.validPassword(senha, data.senha)){
						req.flash('erro', 'Senha não confere!');
						res.redirect('/login');
					}else {

						req.session.usuario = data;
						res.redirect('/home');
					}
				});
			}else{
				res.redirect('/login'); //se for para a autenticação e retornar erros, renderiza a pagina login para exibi-los
			}
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		}
	}

	return HomeController;
}