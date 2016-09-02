var mongoose = require('mongoose');

module.exports = function(){

	var veiculoSchema= mongoose.Schema({
		nome : {type:String, trim: true},
		placa: {type:String, trim: true, unique: true},
		categoria: {type: String}
	});

	return mongoose.model('Veiculos', veiculoSchema);
}