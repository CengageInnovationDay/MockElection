$(document).ready(function(){
    setDragEvents();
    setPanEvents();
    setZoomEvents();
    setClickEvents();
    
    function setDragEvents(){
        var theSVG = $('#statesSVG').get(0);
        var svgView,origMousePos;
        
        function setDrag(evt){
            svgView = theSVG.getAttribute('viewBox').split(' ');
            origMousePos = [evt.clientX,evt.clientY];
            $(document).bind('mousemove',moveSVG);
        }
        function stopDrag(evt){
            $(document).unbind('mousemove');
        }
        function moveSVG(evt){
            var newPos = [
                ((evt.clientX - origMousePos[0]) * -1) + parseInt(svgView[0]),
                ((evt.clientY - origMousePos[1]) * -1) + parseInt(svgView[1]),
                svgView[2],
                svgView[3]
            ];
            console.log(newPos.join(' '));
            theSVG.setAttribute('viewBox',newPos.join(' '));
        }
        
        $('#statesSVG').mousedown(setDrag);
        $(document).mouseup(stopDrag);
    }
    
    function setPanEvents(){
        var panSpeed = 10;
        var theSVG = $('#statesSVG').get(0);
        
        // event codes
        var leftArrow  = 37;
        var upArrow    = 38;
        var rightArrow = 39;
        var downArrow  = 40;
        
        $(window).keydown(function(evt){
            var curView = theSVG.getAttribute('viewBox').split(' '); // [0] = x, [1] = y
            
            switch(evt.keyCode){
                case leftArrow:
                    curView[0] = parseInt(curView[0]) + panSpeed;
                    break;
                case rightArrow:
                    curView[0] = parseInt(curView[0]) - panSpeed;
                    break;
                case upArrow:
                    curView[1] = parseInt(curView[1]) + panSpeed;
                    break;
                case downArrow:
                    curView[1] = parseInt(curView[1]) - panSpeed;
                    break;
                default:
                    return true;
            }
            console.log(curView.join(' '));
            theSVG.setAttribute('viewBox',curView.join(' '));
            
            return false;
        })
    }
    
    function setZoomEvents(){
        $('#svgSlider').slider({
            orientation: "vertical",
            value: 10,
            min: 1,
            max: 20,
            step: 1,
            slide: function(evt,ui){
                setZoom(ui.value);
            }
         });
        
        // mouse wheel zoom logic
        $(document).bind('mousewheel DOMMouseScroll', function (e) {
            var delta = 0, element = $('#svgSlider'), value, result, oe;
            oe = e.originalEvent; // for jQuery >=1.7
            value = element.slider('value');

            if (oe.wheelDelta) {
                delta = -oe.wheelDelta;
            }
            if (oe.detail) {
                delta = oe.detail * 40;
            }

            value -= delta / 8;
            if (value > 100) {
                value = 100;
            }
            if (value < 0) {
                value = 0;
            }

            result = element.slider('option', 'slide').call(element, e, { value: value });
            if (result !== false) {
                element.slider('value', value);
            }
            return false;
        });
    }
    
    function setZoom(value){
        value = value / 10;
        var defaultHeight = 593;
        var defaultWidth = 959;
        var theSVG = $('#statesSVG').get(0);
        var curView = theSVG.getAttribute('viewBox').split(' '); // [2] = width, [3] = height
        curView[2] = defaultWidth * value;
        curView[3] = defaultHeight * value;
        console.log(curView.join(' '));
        theSVG.setAttribute('viewBox',curView.join(' '));
    }
    
    function setClickEvents(){
        $('.state').click(function(){
           if($(this).attr("class") === "state red"){
               $(this).attr("class","state blue");
           }else if($(this).attr("class") === "state blue"){
               $(this).attr("class","state");
           }else{
               $(this).attr("class","state red");
           }
        });
    } 
        
        /** Keep this, says how to create an element inside a path
        var idaho = $('#ID');
        var bbox = idaho.get(0).getBBox();
        var x = Math.floor(bbox.x + bbox.width/2.0);
        var y = Math.floor(bbox.y + bbox.height/2.0);
        var xtop = x + 5;
        var ytop = y + 5;
        var xbottom = x - 5;
        var ybottom = y - 5;
        
        var newpath = document.createElementNS("http://www.w3.org/2000/svg","path");
        newpath.setAttributeNS(null, "id", "pathIdD");
        newpath.setAttributeNS(null, "d", "M " + xtop + "," + ytop + " L " + xtop + "," + ybottom + 
                "L " + xbottom + "," + ybottom + "L " + xbottom + "," + ytop + " z");
        newpath.setAttributeNS(null, "fill", "black");
        
        $('#svg2').append(newpath);**/
})