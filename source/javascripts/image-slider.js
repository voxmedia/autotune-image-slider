var ImageSlider = autotune;

ImageSlider.Public = ( function ( $ ) {
  var addImages = function () {
    // update left photo as background
    $( '.image-compare-top img' ).each( function () {
      $( this ).attr( 'src', ImageSlider.image_left );
      var parentDiv = $( this ).parent();
      console.log(ImageSlider.image_left);
      parentDiv.css( 'background-image', 'url(' + ImageSlider.image_left + ')' );
    } );
    // update right photo as image src
    $( '.image-compare-bottom img' ).each( function () {
      $( this ).attr( 'src', ImageSlider.image_right );
    } );
    $( '.image-compare-top' ).addClass(ImageSlider.slider_theme);
    addEvents();
  };

  "use strict";

  var $tool        = $( '.image-compare-tool'       ),
      $images      = $( '.image-compare-images'     ),
      $topImage    = $( '.image-compare-top img'    ),
      $bottomImage = $( '.image-compare-bottom img' );

  var createSlider = function ( e ) {
    e.preventDefault();
    var topImage    = $( this ).find( '.image-compare-top' ),
        bottomImage = $( this ).find( '.image-compare-bottom img' )[0],
        size        = bottomImage.getBoundingClientRect(),
        position;
    if ( e.originalEvent.type == 'mousemove' ) {
      position    = ( ( e.pageX - size.left ) / bottomImage.offsetWidth ) * 100;
    } else {
      position    = ( ( e.originalEvent.touches[0].pageX - size.left ) / bottomImage.offsetWidth ) * 100;
    }

    if ( position <= 100 ) {
      topImage.css( { 'width': position + '%' } );
    }
  };

  var addEvents = function () {
    $images.each( function () {
      $( this ).on( 'mousemove',  createSlider );
      $( this ).on( 'touchstart', createSlider );
      $( this ).on( 'touchmove',  createSlider );
    } );
  };

  var init = function () {
    addImages();
  };

  init();

} ) ( jQuery );
