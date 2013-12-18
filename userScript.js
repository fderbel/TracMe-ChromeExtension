  //get configurate  information from background.js

  // function to collect attribute and send then to baground.js
    
var fonction =  function (e) {
        var attributes = {
            'x': e.clientX,
            'y': e.clientY,
        };
        fillCommonAttributes(e, attributes);
   // send mess obsel
        chrome.extension.sendRequest({mess:'obsel',OBSEL:attributes}, function(response) {}); 
                              }
   
 $(document).ready(function () {
 // colect the URL document
 
 var attribute={};
 attribute.begin = (new Date()).getTime();
 attribute.end = (new Date()).getTime();
 attribute.subject="Location";
 attribute.url = document.URL;
 attributes.type="URL";
 chrome.extension.sendRequest({mess:'obsel',OBSEL:attribute}, function(response) {});
 
 // get configurate  information from background.js
    chrome.extension.sendRequest({mess: "confg"}, function(response) {
                                  donnees= response.status;onListReceived(donnees);
                                });
                                        
    function onListReceived(donnees){ 
    
   // SelectorPARAM (donnees,function (code){console.log (code);eval(code);})};
    var host=0;
    while ((host < donnees.Page.length) && (document.location!=donnees.Page[host].URL))
            {host++;}
    if (host == donnees.Page.length) {}
    else 
    {    // parcourir les évènement
         var event = donnees.Page[host].event;
         for (var i=0; i < event.length; i++ )
            {  // existance des element
                   if (event[i].element=="")  
                      {$(document).on(event[i].type,fonction);}
                  else{
                  for (var j=0; j < event[i].element.length; j++ ) // pour chaque évènement on parcouru les élements
                 { var listAttribut = event[i].element[j].attribut;
                  if (listAttribut=="") 
              {$(event[i].element[j].tag).on (event[i].type,fonction);}
              else {for (var k=0; k < listAttribut.length; k++ ){var att = "";for (var prop in listAttribut[k] ){  att= att + "["+prop+"="+listAttribut[k][prop]+"]";}
                                  
              //$("+"\""+event[i].element[j].tag+""+att+"\""+")."+event[i].type+"("+fonction+");";
                                                       }}
             }  
       	   }
                          
      
       
         }
        
       

 }
    }    
                                });




 
function getXPath(element) {
        // derived from http://stackoverflow.com/a/3454579/1235487
        while (element && element.nodeType !== 1) {
            element = element.parentNode;
        }
        if (typeof(element) === "undefined") { return "(undefined)"; }
        if (element === null) { return "(null)"; }

        var xpath = '';
        for (true; element && element.nodeType === 1; element = element.parentNode) {
            //if (typeof(element.id) !== "undefined") return "#" + element.id;
            var id = ($(element.parentNode)
                      .children(element.tagName)
                      .index(element) + 1);
            id = (id > 1  ?  '[' + id + ']'  :  '');
            xpath = '/' + element.tagName.toLowerCase() + id + xpath;
        }
        
        return xpath;
    }
function getElementName(element) {

        while (element && element.nodeType !== 1) {
            element = element.parentNode;
        }
        if (typeof(element) === "undefined") { return "(undefined)"; }
        if (element === null) { return "(null)"; }

        //if (typeof(element.id) !== "undefined") return "#" + element.id;
        var id = ($(element.parentNode)
                  .children(element.tagName)
                  .index(element) + 1);
        id = (id > 1  ?  '[' + id + ']'  :  '');
        var nameE = element.tagName.toLowerCase() + id;

        return nameE;
    }

function getElementId(element) {

        while (element && element.nodeType !== 1) {
            element = element.parentNode;
        }
        if (typeof(element) === "undefined") { return "(undefined)"; }
        if (element === null) { return "(null)"; }

        if (typeof(element.id) !== "undefined") { return element.id; }

        return "#";
    }

function fillCommonAttributes(e, attributes) {
        
        attributes.begin = (new Date()).getTime();
        attributes.end = (new Date()).getTime();
        attributes.subject=e.type;
        attributes.type = e.type;
        attributes.url = document.URL;
        attributes.ctrl = e.ctrlKey;
        attributes.shift = e.shiftKey;
        attributes.target = getXPath(e.target);
        attributes.targetName = getElementName(e.target);
        if (e.target.id) { attributes.targetId = e.target.id; }
        if (e.target.text) { attributes.targetText = e.target.text; }
        if (e.currentTarget) {
            attributes.currentTarget = getXPath(e.currentTarget);
            attributes.currentTargetName = getElementName(e.currentTarget);
            if (e.currentTarget.id) {
                attributes.currentTargetId = getElementId(e.currentTarget);
            }
            if (e.currentTarget.text) {
                attributes.currentTargetText = e.currentTarget.text;
            }
        }
        if (e.explicitOriginalTarget) {
            attributes.originalTarget = getXPath(e.explicitOriginalTarget);
            attributes.originalTargetName = getElementName(e.explicitOriginalTarget);
            if (e.explicitOriginalTarget.id) {
                attributes.originalTargetId = getElementId(e.explicitOriginalTarget);
            }
            if (e.explicitOriginalTarget.text) {
                attributes.originalTargetText = e.explicitOriginalTarget.text;
            }
        }
        if (e.target.tagName === "IMG") {
            attributes.imgSrc = e.target.src;
        }
    }
    



