$(document).ready(function(){
    init();
    
    function init(){
        $('.state').click(function(){
           if($(this).attr("class") === "state red"){
               $(this).attr("class","state blue");
           }else if($(this).attr("class") === "state blue"){
               $(this).attr("class","state");
           }else{
               $(this).attr("class","state red");
           }
        });
        
        
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
    }
})