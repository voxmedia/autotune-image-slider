//=require _pym
"use strict";
var ImageSlider = autotune;
var pymChild = new pym.Child();
ImageSlider.Public = ( function ( $ ) {
  var $tool        = $( '.image-compare-tool' ),
      $images      = $( '.image-compare-images' ),
      $topImage    = $( '.image-compare-top img' ),
      $bottomImage = $( '.image-compare-bottom img' );

  $topImage[0].height = $bottomImage[0].height;

  function addImages() {
    // update left photo as background
    if ( ImageSlider.image_left.image_url ) {
      $topImage
        .attr( 'src', ImageSlider.image_left.image_url )
        .parent()
        .css( 'background-image', 'url("' + ImageSlider.image_left.image_url + '")' );
    }

    // update right photo as image src
    if ( ImageSlider.image_right.image_url ) {
      $bottomImage.attr( 'src', ImageSlider.image_right.image_url );
    }

    $topImage.parent()
      .addClass(ImageSlider.slider_theme);

    $images.on( 'mousemove',  createSlider );

    $( '.handle' ).on( 'touchstart touchmove', createSlider );


    var left_image = Object.keys(ImageSlider.image_left).length;
    var right_image = Object.keys(ImageSlider.image_right).length;

    if(left_image > 1 && right_image > 1){
      ImageSlider.image_source_info = [ImageSlider.image_left, ImageSlider.image_right];
      addSources('Source', ImageSlider.image_source_info);
    } else if (left_image > 1 || right_image > 1){
      if(left_image > 1){
        ImageSlider.image_source_info = [ImageSlider.image_left];
      } else if (right_image > 1){
        ImageSlider.image_source_info = [ImageSlider.image_right];
      }
      addSources('Source', ImageSlider.image_source_info);
    }
  };

  function addSources(source){
    var source_str = source + ": ";

    $.each(ImageSlider.image_source_info, function(i, d){
      if(d.credit && d['source']){
        source_str += '<a href="'+d['source']+'" target="blank">'+d.credit+'</a>';
      } else if(d.credit) {
        source_str += d.credit;
      } else if(d['source']) {
        source_str += '<a href="'+d['source']+'" target="blank">'+d['source']+'</a>';
      }
      if(ImageSlider.image_source_info.length > 1){
        source_str += addSep(i, ImageSlider.image_source_info.length);
      }
    })
    $('.sources').append(source_str);
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

  function createSlider( e ) {
    e.preventDefault();
    var topImage    = $( '.image-compare-top' ),
        bottomImage = $( '.image-compare-bottom img' )[0],
        size        = bottomImage.getBoundingClientRect(),
        position;

    if ( e.originalEvent.type == 'mousemove' ) {
      position = ( ( e.pageX - size.left ) / bottomImage.offsetWidth ) * 100;
    } else {
      position = ( ( e.originalEvent.touches[0].pageX - size.left ) / bottomImage.offsetWidth ) * 100;
    }

    if ( position <= 100 ) {
      topImage.css( { 'width': position + '%' } );
    }
  };

  $(window).on('load resize', function(){
    pymChild.sendHeight();
  });

  $(document).ready(function() {
    addImages();
    pymChild.onMessage('updateData', function(data) {
      ImageSlider = JSON.parse(data);
      addImages();
    });
  });
})($);
