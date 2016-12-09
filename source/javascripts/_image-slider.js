//=require _pym
"use strict";
var pymChild = new pym.Child();
(function () {

  var topImage    = document.querySelector( '.image-compare-top img' ),
      bottomImage = document.querySelector( '.image-compare-bottom img' );

  function setup(imageData) {
    topImage.parentElement.className = 'image-compare-top ' + imageData.slider_theme;

    topImage.height = bottomImage.height;

    addSources(imageData);

    pymChild.sendHeight();
  }

  function reset(imageData) {
    // update left photo as background
    if ( imageData.image_left.image_url ) {
      topImage.setAttribute( 'src', imageData.image_left.image_url );
      topImage.removeAttribute('srcset');
    }

    // update right photo as image src
    if ( imageData.image_right.image_url ) {
      bottomImage.setAttribute( 'src', imageData.image_right.image_url );
      bottomImage.removeAttribute('srcset');
    }

    setup(imageData);
  };

  function addSources(imageData, prefix){
    var left_image = Object.keys(imageData.image_left).length;
    var right_image = Object.keys(imageData.image_right).length;
    prefix = prefix || 'Source: '

    if (left_image > 1 || right_image > 1) {
      var sources = [], imageSourceInfo = [];
      if (left_image > 1) { imageSourceInfo.push(imageData.image_left); }
      if (right_image > 1) { imageSourceInfo.push(imageData.image_right); }

      imageSourceInfo.forEach(function(d){
        if (d.source) {
          sources.push( '<a href="'+d.source+'" target="blank">'+(d.credit || d.source)+'</a>' );
        } else if (d.credit) {
          sources.push( d.credit );
        }
      });

      document.querySelector('.sources').innerHTML = prefix + sources.join(' and ');
    } else {
      document.querySelector('.sources').innerHTML = '';
    }
  }

  function createSlider( e ) {
    e.preventDefault();
    var size = bottomImage.getBoundingClientRect();
    var pageX = e.type == 'mousemove' ? e.pageX : e.touches[0].pageX;
    var position = ( ( pageX - size.left ) / bottomImage.offsetWidth ) * 100;

    if ( position <= 100 ) {
      document.querySelector( '.image-compare-top' ).style.width = position + '%';
      document.querySelector( '.handle' ).style.left = position + '%';
    }
  };

  window.addEventListener('resize', function() { pymChild.sendHeight(); });

  document.querySelector( '.image-compare-images' ).addEventListener( 'mousemove', createSlider );
  document.querySelector( '.handle' ).addEventListener( 'touchstart', createSlider );
  document.querySelector( '.handle' ).addEventListener( 'touchmove', createSlider );

  setup(window.autotune);
  pymChild.onMessage('updateData', function(data) {
    reset(JSON.parse(data));
  });
})();
