
var Trace_Name = localStorage["Trace_Active"];
var BASE_URI = localStorage["trace_options_Base_URI"] ;

$('document').ready(function() {
    
    var Activities = JSON.parse(localStorage["trace_options_Trace_Name"]);
    for (i=0;i<Activities.length;i++)
    { 
   var  OPTION = document.createElement ('OPTION');
   OPTION.setAttribute('value',Activities[i]);
   OPTION.appendChild(document.createTextNode(Activities[i]));
   document.getElementById('TraceID').appendChild(OPTION);
   document.getElementById('TraceID').value=localStorage["Trace_Active"];
    }
    
    
});


document.addEventListener('DOMContentLoaded', function () {
    // show Trace
    var trace = document.getElementById('Trace');
    trace.addEventListener("click", function(){
 var assistance_base = 'http://dsi-liris-silex.univ-lyon1.fr/ozalid/assist/';
var assistance_server =  'http://dsi-liris-silex.univ-lyon1.fr/';
var assistance_win = null;
var visualisation_uri = "http://dsi-liris-silex.univ-lyon1.fr/ozalid/assist/index.php?page=TraceView";
var user_id = 'u1';
        assistance_win = window.open (visualisation_uri,"assistance");
	    //opened = true;
	    var i = setTimeout(function(){
				        message = {
					                "type":"trace",
					                "trace_id":Trace_Name,
					                "base_uri":BASE_URI,
					                "user_id":user_id
				                   };
		console.log("postMessage to load assistance");
		assistance_win.postMessage(message,assistance_server);
			                                },10000);
			
		                           });
    // option
  var option = document.getElementById('Option');
        option.addEventListener ("click",function () {
        window.open ("/Option/options.html","option");
                                                     
                                });
    
  //Configuration
  
  var File = document.getElementById('File');
        File.addEventListener ("click",function () {
        window.open ("/Config/Config.html","Configuration");
                                                     
                                });
  
});

$('#TraceID').change(function (){
localStorage["Trace_Active"]=document.getElementById("TraceID").value ;
chrome.extension.sendRequest({mess:'popup'}, function(response) {});

});






