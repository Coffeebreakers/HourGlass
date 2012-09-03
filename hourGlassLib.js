(function($) {
  var HourGlass = function(element,options){

    var settings = {
      elementThumbnails: "li",
      containerThumbnails: ".list-thumbs",
      elementImage: "li",
      containerImage: ".media-box",
      active: ".active",
      classActive: "active",
      timer: ".timer",
      startAt: 0,
      duration: 3000,
      size: '42px',
      reverseOrder: false,
      reverseMove: false
    };
    $options = jQuery.extend(settings, options);
    $options.duration = ($options.duration < 1000) ? $options.duration * 1000 : $options.duration;
    $options.classActive = ($options.active.substring(0,1) === ".") ? $options.active.substring(1) : $options.active;

    moviment = function(element,$options){

      var elem = $(element);
      // [TO-DO] - Criar os status dos novos parametros da funcao
      elem.find($options.containerThumbnails+' '+ $options.active +' '+ $options.timer).animate({
        height: $options.size
      }, {
        duration: $options.duration,
        complete: function() {
          changeTab(element,$options);
        }
      });
    },
    changeTab = function(element,$options){
      currentIndex = $options.startAt;
      var elem = $(element);

      if ((currentIndex) < elem.find($options.containerThumbnails+' '+$options.elementThumbnails).length) {
        elem.find($options.active).removeClass($options.classActive);
        var newClass = elem.find($options.containerThumbnails + ' ' + $options.elementThumbnails).eq(currentIndex).attr('class');
        elem.removeClass().addClass(newClass);
        elem.find($options.containerThumbnails + ' ' + $options.elementThumbnails).eq(currentIndex).addClass($options.classActive);
        elem.find($options.containerImage + ' ' + $options.elementImage).eq(currentIndex - 1).hide();
        elem.find($options.containerImage + ' ' + $options.elementImage).eq(currentIndex).show();
      } else {
        elem.find($options.active).removeClass($options.classActive);
        var newClass = elem.find($options.containerThumbnails + ' ' + $options.elementThumbnails).eq(0).attr('class');
        elem.removeClass().addClass(newClass);
        elem.find($options.containerThumbnails + ' ' + $options.elementThumbnails).eq(0).addClass($options.classActive);
        elem.find($options.containerImage + ' ' + $options.elementImage).eq(currentIndex - 1).hide();
        elem.find($options.containerImage + ' ' + $options.elementImage).eq(0).show();
      };
      elem.find($options.active + ' ' + $options.timer).css('height','0px');
      currentIndex = (currentIndex >= elem.find($options.containerThumbnails + ' ' + $options.elementThumbnails).length - 1) ? 0 : currentIndex + 1;
      $options.startAt = currentIndex;
      moviment(element,$options);
    },
    controller = function(element,$options){
      var elem = $(element);
      elem.find($options.containerThumbnails + ' ' + $options.elementThumbnails+' a').each(function(i){
        $(this).click(function(){
          $options.startAt = i;
          elem.find($options.containerThumbnails + ' ' + $options.active + ' ' + $options.timer).stop();
          changeTab(element,$options);
        });
      });
    }

    changeTab(element,$options);
    controller(element,$options);

  };
  $.fn.hourGlass = function(options) {
    return this.each(function(i) {
      var element = $(this);
      
      if (element.data('hourGlass')) return;

      eval("var vHourGlass"+i+" = new HourGlass(element, options)");

      eval("element.data('hourGlass', vHourGlass"+i+")");
    });
  }
})(jQuery);