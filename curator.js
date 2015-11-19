
$(function() {
	$('form').each(function(form) {
		$(this).detach().insertAfter('body > table + br');
	});
});
