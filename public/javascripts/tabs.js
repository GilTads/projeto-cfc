$(document).ready(function(){

	$('a[href="#main"]').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('a[href="#menu1"]').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('a[href="#menu2"]').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('a[href="#menu3"]').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

});