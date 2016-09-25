$(function() {
  /*
  setTimeout(function() {
    // http://stackoverflow.com/questions/2435751/jquery-fade-element-does-not-show-elements-styled-visibility-hidden
  }, 1000);
  */
  $.get('/fingerprint', function(data) {
    $('#os').text(data.os);
    $('#lang').text(data.lang);
    $('#ip').text(data.ip);
  })
  .always(function() {
    $('#fp').animate({opacity:1}, 500);
  });
});
