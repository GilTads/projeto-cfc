var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function(){

	// var praticoSchema = mongoose.Schema({
	// 	_aluno	:   {
	// 		id	:   {type: Schema.Types.ObjectId, ref: 'Alunos' },
	// 		nome: 	{type: String, ref: 'Alunos'}
	// 	},
	// 	_instrutor: {
	// 		id: 	{type: Schema.Types.ObjectId, ref: 'Usuarios'},
	// 		nome: 	{type: String, ref: 'Usuarios'},
	// 	},
	// 	_veiculo: 	{
	// 		id: 	{type: Schema.Types.ObjectId, ref: 'Veiculos'},
	// 		nome: 	{type: String, ref: 'Veiculos'}
	// 	},
	// });


	var praticoSchema = mongoose.Schema({
		_aluno	:   {type: Schema.Types.ObjectId, ref: 'Alunos' },
		_instrutor: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
		_veiculo: 	{type: Schema.Types.ObjectId, ref: 'Veiculos'}
	});

	return mongoose.model('Pratico', praticoSchema);
}