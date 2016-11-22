var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
	var teoricoSchema = mongoose.Schema({
		nome		: {type: String},
		pacote : {
			_instrutor 	: [{type: Schema.Types.ObjectId, ref: 'Usuarios'}],
			disciplina  : [{type: String}],
			data       	: [{type: Date}],
			horaIni		: [{type: String}],
			horaFim 	: [{type: String}]
		},
		dados 		: {type: Boolean}
	});
	return mongoose.model('Teorico', teoricoSchema);
}