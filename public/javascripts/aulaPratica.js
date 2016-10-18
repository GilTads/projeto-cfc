var horaIniStr = '6:10';
var minutos = 50;

var horaIniSpl = horaIniStr.split(':');
var horaIni = parseInt(horaIniSpl[0],10);
var minIni = parseInt(horaIniSpl[1],10);


for(i = 0; i <=14; i++){
 
	minIni += minutos;
  if(minIni >= 60){
		minIni -= 60;
 	  horaIni += 1;
	}
  

	var horaAula = zeroEsquerda(horaIni) + ":" + zeroEsquerda(minIni);
  console.log(horaAula);
}

 function zeroEsquerda(time){
	if(time < 10){
  	time = '0'+time;
  }
  return time;
}

function muda(){
	document.getElementById('hora').innerHTML = horaFinal;
}
	
