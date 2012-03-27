var SE = SE || {};

SE.selector = function dragSelect(area,toSelect,activeClass){
    var start     = {},
        selectC   = toSelect,
        toSelect  = $(toSelect),
        elm       = $("<div id='drag_selector'></div>"),
        _area     = $(area),
        _selectC  = activeClass.split(/\s+/) || ['selected'],
        toCheck   = true;
    (function setListeners() {
      _area.bind("mousedown",initDrag);
      _area.bind("mouseup",killDrag);
    }())

    function initDrag(e) {
      var tmp = selectC[0] == '.' ? selectC.split('.')[1] : selectC;
      if(!$(e.target).hasClass(activeClass) && !$(e.target).hasClass(tmp)){
        toSelect = $(selectC);
        start = {x: e.pageX - $(window).scrollLeft(), y: e.pageY - $(window).scrollTop()};
        _area.bind("mousemove",onMove);
        elm.css({'left':start.x,'top':start.y});
        _area.append(elm);
      }
    }

    function killDrag(e) {
        elm.removeAttr('style');
        elm.remove();
        $(area).unbind("mousemove",onMove);
    }

    function addSelectedClass() {
      if(toCheck) {
        toCheck = false;
        toSelect.filter(getSelectorString()).removeClass(getAddRemoveString());
        getOverlaps().addClass(getAddRemoveString());
        setTimeout(function(){toCheck=true},50);
      }
    }

    function onMove(e){
      if(e.pageX - $(window).scrollLeft() < start.x) {
        elm.css({'left': e.pageX - $(window).scrollLeft() });
        e.pageX = start.x + $(window).scrollLeft();
      }
      if(e.pageY - $(window).scrollTop() < start.y) {
        elm.css({'top': e.pageY - $(window).scrollTop()});
        e.pageY = start.y + $(window).scrollTop();
      }
      elm.css({
        'width':e.pageX - $(window).scrollLeft() - parseInt(elm.css('left'),10),
        'height':e.pageY - $(window).scrollTop() - parseInt(elm.css('top'),10)
      });
      addSelectedClass();
    }

    // UTIL FUNCTIONS

    function getOverlaps() {
      return toSelect.map(function(){
        if ( elm.overlaps(this) )
          return this;
      });
    }

    function getSelectorString() {
      toR = "";
      for(var i=0,l=_selectC.length;i<l;++i){
        toR += "."+_selectC[i];
      }
      return toR
    }

    function getAddRemoveString() {
      toR = "";
      for(var i=0,l=_selectC.length;i<l; ++i){
        toR += " "+_selectC[i];
      }
      return toR
    }

    return {getSelected: getOverlaps}
}