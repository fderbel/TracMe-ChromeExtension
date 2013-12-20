
var Trace_Name = localStorage["Trace_Active"];
var BASE_URI = localStorage["trace_options_Base_URI"] ;
var Model = localStorage["trace_options_Model_URI"];
var trc;
function onRequest(request, sender, sendResponse) {

// init trace 
var mgr = new tService.TraceManager({base_uri: BASE_URI , async: true}); 
trc = mgr.init_trace({name: Trace_Name	}); 
// recive mess
if (request.mess=="confg")
{
if  (localStorage["Config"]!="undefined")
        {var data = JSON.parse(localStorage["Config"]) ; 
        sendResponse({status: data});}
        
}
else 
if (request.mess=="popup") 
   {
          Trace_Name = localStorage["Trace_Active"];
          trc = mgr.init_trace({name: Trace_Name	});
   }
else 

  {
  var OBSEL = request.OBSEL;
  // send obsel to ktbs
  trc.put_obsels({
		obsel: OBSEL,
		success: function(){console.log("success is callbacked");},
		error: function(jqXHR,textStatus, errorThrown){console.log("error is callbacked.");}
	});	
  
  }
  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
