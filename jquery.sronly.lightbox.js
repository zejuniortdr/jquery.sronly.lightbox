jQuery(document).ready(function($) {
	var altura_janela = $( window ).height();

	$("body").append("<div class='bg-escuro'></div>");
	//console.log($('div.bg-escuro'));
	$('div.bg-escuro').width($( document ).width());
	$('div.bg-escuro').height($( document ).height());

	$("body").append('<div class="container-lightbox"><div class="lightbox"></div><div class="close">X</div><div class="loading"></div></div>')

	$('a.lightbox').click(function(event) {
		/* Act on the event */
		event.preventDefault();
		var url = $(this).attr('href');

		$( "div.container-lightbox .loading" ).fadeIn('fast');
		$( "div.container-lightbox .lightbox" ).load( url, function() {
			//console.log($(this).width());
			//console.log($(this).height());
			$(this).parent().css({
				top: $( document ).scrollTop() + $( window ).height()/2 - $(this).parent().height()/2,
				left: $( document ).width()/2 - $(this).parent().width()/2
			});

			$('div.bg-escuro').fadeIn('fast', function() {
				$( "div.container-lightbox" ).fadeIn('fast', function() {
					$( "div.container-lightbox div.close").css({
						top: -$( "div.container-lightbox .lightbox" ).height() - $( "div.container-lightbox div.close").height() -15,
						left: $( "div.container-lightbox .lightbox" ).width() - $( "div.container-lightbox div.close").width()
					}).delay(1000).fadeIn('fast', function() {});
				});
				$( "div.container-lightbox .loading" ).fadeOut('fast');
			});


		});
	});

	$('div.bg-escuro, div.container-lightbox div.close').click(function(event) {
		/* Act on the event */
		$( "div.container-lightbox .lightbox" ).html('');
		$( "div.container-lightbox" ).fadeOut('fast');
		$('div.bg-escuro').fadeOut('fast');
	});

	$( document ).scroll(function() {
		//console.log("document scroll: "+$( document ).scrollTop());
		//console.log("window.height: "+altura_janela/2);
		//console.log("this.height: "+$( "div.container-lightbox" ).height()/2);

		$( "div.container-lightbox" ).css({
			top: $( document ).scrollTop() + $( window ).height()/2 - $( "div.container-lightbox" ).height()/2
		});

		$( "div.container-lightbox div.close").css({
			top: -$( "div.container-lightbox .lightbox" ).height() - $( "div.container-lightbox div.close").height() -15,
			left: $( "div.container-lightbox .lightbox" ).width() - $( "div.container-lightbox div.close").width()
		})
	});

});