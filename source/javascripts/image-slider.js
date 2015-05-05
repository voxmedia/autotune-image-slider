var ImageSlider = autotune;

var pymChild = new pym.Child();

ImageSlider.Public = ( function ( $ ) {
  var addImages = function () {
    // update left photo as background
    $( '.image-compare-top img' ).each( function () {
      $( this ).attr( 'src', ImageSlider.image_left );
      var parentDiv = $( this ).parent();
      parentDiv.css( 'background-image', 'url(' + ImageSlider.image_left + ')' );
    } );
    // update right photo as image src
    $( '.image-compare-bottom img' ).each( function () {
      $( this ).attr( 'src', ImageSlider.image_right );
    } );
    $( '.image-compare-top' ).addClass(ImageSlider.slider_theme);

    if(ImageSlider.image_source_info){
      addSources();
    }
    addEvents();
  };

  "use strict";

  function addSources(){

    var source_str = 'Sources: ';

    $.each(ImageSlider.image_source_info, function(i, d){
      if(d.image_text && d.url){
        source_str += '<a href="'+d.url+'" target="blank">'+d.image_text+'</a>';
      } else if(d.image_text) {
        source_str += d.image_text;
      } else if(d.url) {
        source_str += '<a href="'+d.url+'" target="blank">'+d.url+'</a>';
      }
      if(ImageSlider.image_source_info.length > 1){
        source_str += addSep(i, ImageSlider.image_source_info.length);
      }
    })
    $('.sources').append(source_str);
    pymChild.sendHeight();
  }

  function addSep(i, n){
    if (i==(n-1)){
      return '';
    } else if (i==(n-2)){
      return ' and ';
    } else {
      return ', ';
    }
  }

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
