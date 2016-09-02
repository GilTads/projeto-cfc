module.exports= function(app){

	var veiculo = app.controllers.veiculosControle;

	app.route('/veiculos')
		.get(veiculo.cadastrar);

}