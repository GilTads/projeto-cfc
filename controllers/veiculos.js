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
		},
		editar: function(req, res){
			Veiculo.findById(req.params.id, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao editar: '+err);
					res.redirect('veiculos');
				}else{
					res.render('veiculos/editar', {veiculo: data});
				}
			});
		},
		update: function(req, res){
			Veiculo.findById(req.params.id, function(err, data){
				var modelo 		 = data;
				modelo.nome 	 = req.body.nome;
				modelo.placa 	 = req.body.placa;
				modelo.categoria = req.body.categoria;

				modelo.save(function(err){
					if(err){
						req.flash('erro', 'Erro ao editar veículo');
						res.redirect('/veiculos');
					}else{
						req.flash('info', 'Veículo atualizado com sucesso!');
						res.redirect('/veiculos');
					}
				})
			});
		}
	}

	return veiculoController;
}