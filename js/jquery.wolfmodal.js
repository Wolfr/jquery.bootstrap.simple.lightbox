$(document).ready(function() {

	var modalHTML = '<div class="modal" style="display: none;"><div class="mContent"><a href="#" class="buttonClose" title="Close this window"><strong>Close</strong> (X)</a><img src="" alt="" /><p class="caption"></p></div></div><div id="modalOverlay" style="display: none\;">&nbsp\;</div>';
	$('body').append(modalHTML);
	
	// Preload all images
	$('a.lightbox').each(function() {
		var src = $(this).attr('href');
		$('body').append('<img class="imageShim" src="' + src + '" />');
	});

	// When clicking on an <a> with class lightbox
	$('a.lightbox').click(function(evt)
	{
		// Prevent default link behaviour
		evt.preventDefault();

		// Define contents of lightbox
		$('.modal img')
			.attr('src', $(this).attr('href'))
			.attr('alt', $(this).attr('alt'));

		// Caption = img alt tag
		$('.caption').html($(this).find('img').attr('alt'));

		// Load the image offscreen
		var imageSource = $(this).attr('href');
		$('body').append('<img id="imageShim" src="' + imageSource + '" />');

		var imageShim = $('#imageShim');
		var shimWidth = imageShim.width();
		var shimHeight = imageShim.height();
		// console.log('The width of the image is ' + shimWidth + ' and the height is ' + shimHeight);

		// initialize object references
		var oElement = $('.modal');
		var oWindow = $(window);

		// calculate offset
		var offsetLeft = parseInt((oWindow.width() - shimWidth) / 2);
		var offsetTop = parseInt((oWindow.height() - shimHeight) / 2);

		oElement.css('left', offsetLeft)
				.css('top', offsetTop)
				.css('width', shimWidth)
				.css('height', shimHeight)
				.css('position', 'fixed');

		// IE6 should use position: absolute; since fixed is not supported
		if($.browser.msie && $.browser.version =='6.0') {
			oElement.css('position', 'absolute')
			        .css('top', offsetTop + oWindow.scrollTop());
		}

		// open lightbox
		showBox();
	});

});

function showBox() {

	// IE6/7/8 does not correctly support opacity
	if (jQuery.browser.msie) {

		// show modal box: no animation for IE
		$('#modalOverlay, .modal').show();

		// IE bugfixes
		if($.browser.msie && $.browser.version =='6.0') {
			// Persistent overlay opacity for IE6
			// Make sure modalOverlay has full body height
			$('#modalOverlay').css("filter", "alpha(opacity=33)").css('height', $('body').height());
		}

	} else {
		// Simple fadeIn for the better browsers that support opacity well
		$('#modalOverlay, .modal').fadeIn("fast");
	}

	// Hide modal box when clicking outside it or on the close button
	$('#modalOverlay, .buttonClose').bind('click', function(evt) {
		// Prevent default link behaviour
		evt.preventDefault();
		//  Close modal box
		closeBox();
	});

	// Hide modal box when pressing escape button
	$('html').bind("keyup", function(evt) {
		if (evt.keyCode == 27 || evt.keyCode == 88) {
			closeBox();
		}
	});

}

function closeBox() {
	// Make sure the hide code has no effect on the modal box itself
	$('.modal').bind('click', function(evt) { evt.stopPropagation(); });

	// Clean up DOM: all shims should be removed
	$('#imageShim').remove();

	// Too much bugs with alpha/opacity, so IE6 gets a simple hide()
	if (jQuery.browser.msie) {
		$('#modalOverlay, .modal').hide();
	} else {
		// Hide modal and overlay
		$('#modalOverlay, .modal').fadeOut("fast");
	}

}