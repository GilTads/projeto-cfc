var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function(){

	var praticoSchema = mongoose.Schema({
		//nome		: {type: String},
		_aluno 		: {type: Schema.Types.ObjectId, ref: 'Alunos' },
		_instrutor	: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
		_veiculo 	: {type: Schema.Types.ObjectId, ref: 'Veiculos'},
	});

	return mongoose.model('Pratico', praticoSchema);
}