module.exports = function(app){

	var Usuario = app.models.usuario;

	var InstrutorController = {

		listar: function(req, res){

			Usuario.find({setor: "Instrutor"}, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao buscar instrutores: '+err);
					res.redirect('/home');
				}else{
					res.render('instrutores/index', {instrutor: data});
				}
				
			});
		}
	}
	return InstrutorController;
}