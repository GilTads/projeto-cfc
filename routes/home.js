module.exports = function(app){

	var home  	   = app.controllers.home;
	var autenticar = require('../middleware/autenticar');

	app.route('/')
		.get(home.index);

	app.route('/login')
		.get(home.loginPage);

	app.route('/autenticar')
		.post(home.autenticacao);


	app.route('/home')
		.get(home.home);

	app.route('/logout')
		.get(home.logout);
}