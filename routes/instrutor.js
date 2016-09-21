module.exports = function(app){

	var instrutor = app.controllers.instrutores;
	var autenticar = require('../middleware/autenticar');

	app.route('/instrutores')
		.get(autenticar, instrutor.listar);
}