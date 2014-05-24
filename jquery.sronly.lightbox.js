function is_img(path){
	var a = path.toLowerCase().split('.');
	var ext = a[a.length-1];
	var image_types = ['jpg','png','gif'];
	return $.inArray(ext, image_types) >= 0 ? true : false;
}

jQuery(document).ready(function($) {
	var altura_janela = $( window ).height();

	$("body").append("<div class='bg-escuro'></div>");
	$('div.bg-escuro').width($( document ).width());
	$('div.bg-escuro').height($( document ).height());

	$("body").append('<div class="container-lightbox"><div class="lightbox"></div><div class="close">X</div><div class="loading"></div></div>')

	$('a.lightbox').click(function(event) {
		/* Act on the event */
		event.preventDefault();
		var url = $(this).attr('href');

		$( "div.container-lightbox .loading" ).fadeIn('fast');


		if(!is_img(url)){
			// CONTEUDO HTML COMO EMBEDS E OUTROS LINKS
			$( "div.container-lightbox .lightbox" ).load( url, function() {
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
		}else{
			// IMAGENS
			console.log(url);
			var loader_img = new Image();
			loader_img.onload = function() {
				//alert(this.width + 'x' + this.height);
				$("div.container-lightbox .lightbox").append("<img src='"+this.src+"' width='"+this.width+"'' height='"+this.height+"' />");
				$("div.container-lightbox .lightbox img").load(function() {
					console.log($(this));
					/* Act on the event */

					var img_w = $(this).width();
					var img_h = $(this).height();
					var half_w = $( document ).width()/2;
					var pos_left = half_w-img_w/2;
					var pos_top = $( document ).scrollTop() + $( window ).height()/2 - img_h/2;

					$("div.container-lightbox .lightbox").parent().css({
						top:  pos_top,
						left: pos_left
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
			}
			loader_img.src = url;

		}


	});

	$('div.bg-escuro, div.container-lightbox div.close').click(function(event) {
		/* Act on the event */
		$( "div.container-lightbox .lightbox" ).html('');
		$( "div.container-lightbox" ).fadeOut('fast');
		$('div.bg-escuro').fadeOut('fast');
	});

	$( document ).scroll(function() {

		$( "div.container-lightbox" ).css({
			top: $( document ).scrollTop() + $( window ).height()/2 - $( "div.container-lightbox" ).height()/2
		});

		$( "div.container-lightbox div.close").css({
			top: -$( "div.container-lightbox .lightbox" ).height() - $( "div.container-lightbox div.close").height() -15,
			left: $( "div.container-lightbox .lightbox" ).width() - $( "div.container-lightbox div.close").width()
		})
	});

});