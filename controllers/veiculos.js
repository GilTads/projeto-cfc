module.exports = function(app){

	var Veiculo = app.models.veiculo;

	var veiculoController = {

		cadastro: function(req, res){
			res.render('veiculos/cadastro-veiculo', {veiculo : new Veiculo()});
		},

		index: function(req,res){
			Veiculo.find(function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao buscar veículos' + err);
					req.redirect('/veiculos');
				}
				else{
					res.render('veiculos/index-veiculo', {lista : dados});
				}
			});
		},
		create: function(req, res){
			var modelo = new Veiculo();
			modelo.nome = req.body.nome;
			modelo.placa = req.body.placa;
			modelo.categoria = req.body.categoria;

			Veiculo.findOne({'placa' : modelo.placa}, function(err, data){
				if(data){
					req.flash('erro', 'Placa já cadastrada');
					res.render('veiculos/cadastroVeiculo', {veiculo: modelo});
				}else{
					modelo.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao cadastrar : ' + err);
							req.render('veiculos/cadastroVeiculo', {veiculo: modelo});
						}else{
							req.flash('info', 'Veículo cadastrado com sucesso!');
							res.redirect('/veiculos');
						}
					});
				}
			});
			// res.render('veiculos/cadastroVeiculo', {veiculo: req.body});
		}
	}

	return veiculoController;
}