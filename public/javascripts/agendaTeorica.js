$(document).ready(function() {
	
	$('.timepicker').pickatime({
		format: 'H:i',
		min: [7,0],
		max: [23,0],
		interval: 30,
    onClose: function() {
      $('.timepicker').blur();
    }

	});

  $('.picker').appendTo('body');

});

function dma(data){
      var dia = data.getDate();
      var mes = data.getMonth()+1;
      var ano = data.getFullYear();

      
      if(dia < 10){
        dia = '0'+dia;
      }

      var dataAula = dia +'/' +mes+'/'+ ano;
      console.log('Hora do Mongo: '+dataAula);
      return dataAula;
}


// $('#cron').submit(function(e){
//   e.preventDefault();
  

//   $.ajax({
//     url: '/criar/cronograma',
//     type: 'POST',
//     dataType: 'json',
//     data:{
//       aulas: teorico 
//     }
//   })
// });



  //   // page is now ready, initialize the calendar...

  //   $('#calendar').fullCalendar({
  //   	schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
  //   	locale:'pt-br',
  //   	defaultView: 'agendaWeek',
  //   	theme: true,
  //   	allDaySlot: false,
  //   	minTime: '06:00:00',
  //   	maxTime: '23:00:00',
  //   	editable: true,
  //   	selectable: true,
		// selectHelper: true,

  //   	select: function(start, end){
  //   		var eventData= {
  //   			title: 'Aula teórica',
  //   			start: start,
  //   			end: end
  //   		};
    	
  //   		$('#calendar').fullCalendar('unselect');
  //   	},
  //   	eventRender: function(event, element) {
	 //        element.qtip({
	 //            content: event.description
	 //        });
	 //        	$('#calendar').fullCalendar('renderEvent', eventData, true);
	 //    },
		// eventLimit: true,
  //   });
