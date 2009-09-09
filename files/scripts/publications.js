(function () {
	var hide = $('<p class="showhide" style="display: none" ><a class="hide">Hide abstract</a></p>');
	var show = $('<p class="showhide"><a class="show">Show abstract</a></p>');
	$("div.abstract").prepend(hide).prepend(show);
	$("p.abstract").hide();
	$("div.abstract p.showhide a").click(function () {$(this).parent().parent().children('p').toggle()});
})();

