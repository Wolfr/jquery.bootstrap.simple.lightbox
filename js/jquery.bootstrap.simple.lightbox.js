/*
 * jQuery simple lightbox
 * A really simple jquery lightbox
 * version 0.3
 *
 * www.wolfslittlestore.be
 * Copyright 2013, Wolf's Little Store
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function($) {

  $.fn.simpleLightbox = function() {

    return this.each(function() {

      var $this = $(this);

      init();

      function init(e, options) {

        // Plugin settings
        // No options yet
        var settings = $.extend( {
          placeholder         : 'value'
        }, options);

        // When clicking on an <a> with class lightbox
        $this.click(function(e) {
          // Prevent default link behavior
          e.preventDefault();

          // Open lightbox
          showBox();
        });
      }

      function showBox(e){

        // Set up our needed HTML
        var modalHTML = '<div class="simple-lightbox modal hide fade">\
                          <div class="modal-content">\
                             <a class="close" href="#"><span>&times;</span></a>\
                             <img src="" alt="" /><p class="caption"></p>\
                           </div>\
                         </div>\
                         <div class="modal-backdrop hide">&nbsp\;</div>';

        $('body').append(modalHTML);

        // Load the image offscreen
        var imageSource = $this.attr('href');
        $('body').append('<img class="image-shim hide" src="' + imageSource + '" />');

        // Define contents of lightbox
        $('.simple-lightbox img')
          .attr('src', $this.attr('href'))
          .attr('alt', $this.find('img').attr('alt'));

        // Fade in the lightbox
        $('.simple-lightbox').addClass('in');

        // Caption = img alt tag
        if ($this.find('img').attr('alt')) {
          $('.caption').addClass('active').html($this.find('img').attr('alt'));
        };
        
        $('.modal-backdrop, .simple-lightbox').removeClass('hide');

        // Hide modal box when clicking outside it or on the close button
        $('.modal-backdrop, .close').bind('click', function(evt) {
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

      };

      function closeBox(e) {

        // console.log('closeBox');
        
        $('.simple-lightbox, .modal-backdrop').remove();

        // Make sure the hide code has no effect on the modal box itself
        $('.simple-lightbox').bind('click', function(evt) { evt.stopPropagation(); });

        // Hide modal and backdrop
        $('.modal-backdrop, .modal').addClass('hide');
      }

    });

  };

})(jQuery);