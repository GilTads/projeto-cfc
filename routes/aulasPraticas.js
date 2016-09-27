module.exports = function(app){

	var aula = app.controllers.aulasPraticas;
	var autenticar = require('../middleware/autenticar');

	app.route('/aulas/praticas')
		.get(autenticar, aula.index);
}