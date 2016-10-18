module.exports= function(app){

	var veiculo = app.controllers.veiculos;
	var autenticar = require('../middleware/autenticar');
	var permissao = require('../middleware/permissao');

	app.route('/veiculos')
		.get(autenticar, veiculo.index);

	app.route('/cadastroVeiculo')
		.get(permissao,veiculo.cadastro)
		.post(veiculo.create)

}