	var express 	 	= require('express')
	   ,logger 		 	= require('morgan')
	   ,favicon 		= require('express-favicon')
	   ,cookieParser 	= require('cookie-parser')
	   ,bodyParser 	 	= require('body-parser')
	   ,session 	 	= require('express-session')
	   ,flash 		 	= require('express-flash')
	   ,moment 		 	= require('moment')
	   ,expressValidator= require('express-validator')
	   ,path 	     	= require('path')
	   ,load 		 	= require('express-load')
	   ,mongoose	 	= require('mongoose');
	   // ,jqueryConfirm	= require('jquery-confirm');

	var porta 	= 3000;

	//conexão com o database mongodb
	mongoose.connect('mongodb://localhost/projeto-cfc', function(err){
		if(err){
			console.log("Erro ao conectar no mongodb: "+err);
		}else{
			console.log("Conexão com o mongodb efetuada com sucesso!");
		}
	});

	var app = express();
	app.use(favicon(__dirname + '/public/img/road.ico'));	
	//exibindo erros se houver
	var erros = require('./middleware/erros');

	//configurando as views e o motor de renderização
	app.set('views', path.join(__dirname,'views'));
	app.set('view engine', 'jade');

	
	app.use(logger('dev')); // Exexuta os logs somente em modo de desenvolvimento
	app.use(bodyParser.urlencoded()); //Trabalha com req e res de urls
	app.use(bodyParser.json());// Trabalha com req e res de json
	app.use(expressValidator());
	app.use(cookieParser());
	app.use(session({
		secret: 'gilmarifms2016',
		saveUninitialized: true,
		resave: true
	}));
	app.use(express.static(path.join(__dirname,'public')));
	app.use(flash());

	app.use(function(req,res,next){
		res.locals.session 	= req.session.usuario;
		res.locals.isLogged	= req.session.usuario ? true : false;
		res.locals.moment 	= moment;
		next();
	});


	load('models')
		.then('controllers')
		.then('routes')
		.into(app);

	//tratando paginas de erro
	// app.use(erros.notfound);
	// app.use(erros.serverError);

	app.listen(porta, function(){
		console.log('Servidor node js ativo na porta '+ porta);
	});