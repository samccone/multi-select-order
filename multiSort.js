function multiSort(args){
  var area        = args.area;
  var toSelect    = args.toSelect;
  var activeClass = args.activeClass;
  var container   = args.container;

  function setSortable(){
    var handle = $(container);
    var uiElms = [];
    var _window = $(window);
    function fixContentPosition(e){
      var dims = { w : uiElms[0].width()/2, h : uiElms[0].height()/2};
      for(var i=0, l=uiElms.length; i<l; ++i){
        uiElms[i].css({'left':e.pageX - _window.scrollLeft() - dims.w,'top': e.pageY - _window.scrollTop() - dims.h + i * 20, 'position':'fixed'});
      }
    }
  }

  handle.multisortable({
    start: function(e, ui) {
      uiElms = [];
      ui.helper.each(function(){
        uiElms.push($(this));
      })
      $('.ui-multisort-grouped').length > 3 && $('.ui-multisort-grouped').addClass('many-selected');
      $('.image.active').removeClass('active');
      $(document).bind('mousemove',fixContentPosition)
    },
    update: function(e, ui) {
      var group = $('.ui-multisort-grouped').not(ui.item);
      group.clone().insertAfter($(ui.item));
      group.remove();
      $('.ui-multisort-grouped').removeClass('ui-multisort-grouped many-selected');
    },
    stop: function(e,ui){
      $(document).unbind('mousemove',fixContentPosition);
    }
  });

  SE.selector(area,toSelect,activeClass);
  setSortable();
}