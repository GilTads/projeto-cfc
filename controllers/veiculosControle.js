module.exports = function(app){

	var veiculoController = {

		cadastrar: function(req, res){
			res.render('veiculos/cadastroVeiculo');
		},

		listar: function(req,res){

		}
	}

	return veiculoController;
}