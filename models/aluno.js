var mongoose = require('mongoose');


module.exports = function(){
	var alunoSchema = mongoose.Schema({
		nome: 	{type: String,trim:true},
		idade:  {type: Number},
		rg: 	{type: String,trim:true},
		cpf: 	{type: String,trim:true, unique: true},
		renach: {type: String,trim:true},
		sexo: 	{type: String},
		pais: 	{
			pai: {type: String,trim:true},
			mae: {type: String,trim:true}
		},
		endereco: {
			rua: 	{type: String,trim:true},
			numero: {type: Number},
			bairro: {type: String,trim:true},
			cep: 	{type: String,trim:true},
			cidade: {type: String,trim:true},
			uf: 	{type: String,trim:true},
		},
		telefones:{
			res: {type: String,trim:true},
			cel: {type: String,trim:true},
			opc: {type: String,trim:true}
		},
		data_cad: {type: Date, default:Date.now},
		qnt_aulas:{
			carro:{type:Number},
			moto: {type:Number},
		},

	});

	return mongoose.model('Alunos', alunoSchema);
}