
$(document).ready(() => { 

    $("#btn-accept").click(() => {
        document.getElementById("pop-up").setAttribute("style", "position:absolute;top:-200%;transition-duration:2s;opacity:0;");
        document.getElementById("content").setAttribute("id", "contenta");
        var imgStatus = $("#ico").attr("src");    
    if(imgStatus=="") {                
        $("#ico").css({"border" : "3px dotted black", "background" : "white"});
    }
    $("#li11").click(() => {
        window.location.href = "/freeGenerator";
    });
    $("#li1").click(() => {
        window.location.href = "/freeGenerator";
    });
    $("#li2").click(() => {
        window.location.href = "/aboutUs";
    });
    $("#li3").click(() => {
        window.location.href = "/ourRatings";
    });
    $("#li4").click(() => {
        window.location.href = "/login";
    });
    setTimeout(() => {
        $("#body-head").css({"top": "120%", "transition-duration" : "1.5s"});
        $("body-head").html("Play On Hypixel For Free");
        document.getElementById("fire1").setAttribute("src", "IMG/Fire.gif");
        document.getElementById("fire1").setAttribute("style", "opacity:1;transition-duration:0.5s;");
    }, 4000);
    setTimeout(() => {
        var a = screen.width;
        console.log(a);
        if(a<430) {
            document.getElementById("body-head").setAttribute("style", "font-size:17px;");
        }
        $("#body-head").html("Get Your Premium Account Now!");
        $("#body-head").css({"top": "300px", "transition-duration" : "1.5s"});
        
    }, 5500);
    
});
});
function openMenu() {
    setTimeout(() => {
        document.getElementById("ul1").setAttribute("style", "display:block;");
    }, 200);
    document.getElementById("menu").setAttribute("style", "width:90vw;transition-duration:0.3s;");
    document.getElementById("close").setAttribute("style", "width:10vw;");
}
function closeMenu() {
    setTimeout(() => {
        document.getElementById("ul1").setAttribute("style", "display:none;");
    }, 100);
    document.getElementById("close").setAttribute("style", "width:0vw;");
    document.getElementById("menu").setAttribute("style", "width:0vw;transition-duration:0.3s;");
}
