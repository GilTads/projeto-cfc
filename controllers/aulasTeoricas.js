module.exports = function(app){

	var aulasTeoricasController = {

		index: function(req, res){
			res.render('aulas/index_teorica');
		}
	}
	return aulasTeoricasController;
}