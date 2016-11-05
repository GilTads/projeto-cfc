	var mongoose = require('mongoose');
	var bcrypt 	 = require('bcrypt-nodejs');

	module.exports = function(){
		var usuarioSchema = mongoose.Schema({
			nome 		: {type:String, trim:true},
			senha 		: {type:String},
			email 		: {type:String, trim:true, unique:true, index: true},
			fone 		: {type:String, trim:true},
			cel 		: {type:String, trin:true},
			cpf 		: {type:String, trim:true, unique:true, index: true},
			rg 			: {type:String, trim:true, unique:true},
			setor 		: {type:String},
			instrutor	:{
				credencial: {type: String},
				categoria : {type: String}
			},
			data_cad 	: {type:Date, default:Date.now},
			horario: {
				pratico: [{type: Date}]
			}

		});

		usuarioSchema.methods.generateHash = function(senha){
			return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
		};

		usuarioSchema.methods.validPassword = function(senha) {
	    	return bcrypt.compareSync(senha, this.senha);
		};

		usuarioSchema.methods.validPassword = function(senha, old_senha){
			return bcrypt.compareSync(senha, old_senha, null);
		}

		return mongoose.model('Usuarios',usuarioSchema);

	}

	