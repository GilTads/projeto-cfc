$(document).ready(function() {
	
	$('.timepicker').pickatime({
		format: 'H:i',
		min: [7,0],
		max: [23,0],
		interval: 30

	});

});








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
