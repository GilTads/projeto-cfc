module.exports= function(app){

	var veiculo = app.controllers.veiculos;
	var autenticar = require('../middleware/autenticar');

	app.route('/veiculos')
		.get(autenticar, veiculo.index);

	app.route('/cadastroVeiculo')
		.get(veiculo.cadastro)
		.post(veiculo.create)

}