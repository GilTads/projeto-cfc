module.exports = function(app){

	var aulasPraticasController = {
		index: function(req, res){
			console.log('Entrou aqui na aulasPraticasController');
			res.render('aulas/index_pratica');
		}
	}
	return aulasPraticasController;
}