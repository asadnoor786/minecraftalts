function loadBody()
 {
     var auth = JSON.parse(localStorage.getItem("Auth"));
     
     if(auth===null) {
         window.location.href="/login";
     }
     else {
        console.log(auth);
        var date = new Date();
        date = date.getDate();
        var date1 = auth['lastLogin'];
     if(date-date1>=1) {
         localStorage.removeItem("Auth");
         location.reload();
     }
    }
     var totalleft = localStorage.getItem("total-left");
     document.getElementById("pre-total-num").innerHTML = totalleft;
     var b = totalleft/4000;
     document.getElementById("meter3").value = b;
     
    var generatedTotal = localStorage.getItem("total-num");
    if(generatedTotal===null) {
       document.getElementById("total-num").innerHTML = 0;
       localStorage.setItem("total-num", 0);
    }
    else {
        document.getElementById("total-num").innerHTML = generatedTotal;
    }
    var meter2 = generatedTotal/1500;
    meter2 = meter2.toFixed(2);
    document.getElementById("meter2").value = meter2;




     var generatedToday = localStorage.getItem("today-num");
     if(generatedToday===null) {
        document.getElementById("today-num").innerHTML = 0;
        localStorage.setItem("today-num", 0);
     }
     else {
         document.getElementById("today-num").innerHTML = generatedToday;
     }
     var meter1 = generatedToday/15;
     meter1 = meter1.toFixed(2);
     document.getElementById("meter1").value = meter1;
     console.log(meter1);
     particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
}
function menuOpen() {
    document.getElementById("bodyy").setAttribute("style", "overflow-y:hidden;");
    document.getElementById("menu").setAttribute("style", "position:absolute;width:90vw;transition-duration:0.3s;z-index:10;");
    document.getElementById("close").setAttribute("style", "width:10vw;")
    document.getElementById("ul1").setAttribute("style", "display:block;");
    document.getElementsByTagName("li")[4].setAttribute("style", "display:block;");
    document.getElementsByTagName("li")[5].setAttribute("style", "display:block;");
    document.getElementsByTagName("li")[6].setAttribute("style", "display:block;");
    document.getElementsByTagName("li")[7].setAttribute("style", "display:block;");
    document.getElementsByTagName("li")[8].setAttribute("style", "display:block;");
    document.getElementsByTagName("li")[9].setAttribute("style", "display:block;");

}
function closeMenu() {
    document.getElementById("bodyy").setAttribute("style", "overflow-y:scroll;");
    document.getElementById("menu").setAttribute("style", "width:0vw;transition-duration:0.3s;z-index:10;");
    setTimeout(() =>{
        document.getElementsByTagName("li")[4].setAttribute("style", "display:none;");
    document.getElementsByTagName("li")[5].setAttribute("style", "display:none;");
    document.getElementsByTagName("li")[6].setAttribute("style", "display:none;");
    document.getElementsByTagName("li")[7].setAttribute("style", "display:none;");
    document.getElementsByTagName("li")[8].setAttribute("style", "display:none;");
    document.getElementsByTagName("li")[9].setAttribute("style", "display:none;");
    }, 100);
    document.getElementById("close").setAttribute("style", "width:0vw;")
}
function deleteHistory() {
    localStorage.removeItem("Auth");
    location.reload();
}