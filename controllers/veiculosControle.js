module.exports = function(app){

	var Veiculo = app.models.veiculo;

	var veiculoController = {

		cadastro: function(req, res){
			res.render('veiculos/cadastroVeiculo', {veiculo : new Veiculo()});
		},

		index: function(req,res){
			Veiculo.find(function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar veículos' + err);
					req.redirect('/veiculos');
				}
				else{
					res.render('veiculos/indexVeiculo', {lista : dados});
				}
			});
		},
		create: function(){

		}
	}

	return veiculoController;
}