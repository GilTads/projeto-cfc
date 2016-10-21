var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var aulaPraticaSchema = mongoose.	Schema({
		_aluno 		: {type: Schema.Types.ObjectId, ref: 'Alunos' },
		_instrutor	: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
		_veiculo 	: {type: Schema.Types.ObjectId, ref: 'Veiculos'},
		data : {type: Date}
	});

	return mongoose.model('AulaPratica', aulaPraticaSchema);

	
}