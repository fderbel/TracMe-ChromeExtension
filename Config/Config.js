var eventObj= ["click","dblclick","Focus","keydown","keypress","mouseover","Load"];
var elementObj =["DIV","P","SPAN","A","IMG","UL","LI","TABLE","FORM","BUTTON","INPUT"];
var index=0;
// event ADD 

var ADD = document.getElementById('ADDEvent');
ADD.addEventListener("click", function() {
// Event div
var eventdiv = document.createElement("div");
eventdiv.setAttribute ("Id",index);
var div = document.createElement("div");
div.setAttribute ('class','input-group');
 var label = document.createElement("label");
label.setAttribute('for','Event Type');
label.setAttribute('class','control-label input-group-addon');
label.appendChild(document.createTextNode("Event Type"));
var select = document.createElement("select");
select.setAttribute('class','form-control');
select.setAttribute('Id','eventType');
for (var j=0; j< eventObj.length; j++)
{
select.options[select.options.length] = new Option(eventObj[j],eventObj[j]);
}

div.appendChild(label);
div.appendChild(select);
// Element div 
var div1 = document.createElement("div");
div1.setAttribute ('class','input-group');
div1.setAttribute ('Id','Element');
 var label1 = document.createElement("label");
label1.setAttribute('for','ELement');
label1.setAttribute('class','control-label input-group-addon');
label1.appendChild(document.createTextNode("Element"));
div1.appendChild(label1);
var divC = document.createElement("div");
divC.setAttribute ('class','form-control');
for (var i=0;i < elementObj.length; i++)
{
    var labelC = document.createElement("label") ;
    labelC.setAttribute('class','checkbox-inline');
    var inputC = document.createElement ("input");
    inputC.setAttribute('type','checkbox');
    inputC.setAttribute('name',elementObj[i]);
    labelC.appendChild (inputC);
    labelC.appendChild(document.createTextNode(elementObj[i]));
    divC.appendChild (labelC);
}
div1.appendChild(divC);
eventdiv.appendChild(div);
eventdiv.appendChild(div1);
document.getElementById("EventList").appendChild(eventdiv);
index++;
 });


// event Save 

var Save = document.getElementById('Save');
Save.addEventListener("click", function() {
var  URL = document.getElementById("URL").value;
var eventArray= [];
// parcourir all event $
for (var i=0 ; i< index ; i++ )
{
var eventType = document.getElementById(i).getElementsByTagName("select")[0].value;
var elementArray=[];
        // all element
        
        $("#"+i+" #Element > div.form-control > label > input:checked").each(function() {
                   var attributArray=[];
                    var elementObj={"tag":this.name , "attribut":attributArray};
                    elementArray.push(elementObj);
                         });
       
var eventObj ={type:eventType,element:elementArray};
eventArray.push (eventObj);


}
var Page = {URL: URL , event:eventArray };
if (typeof(localStorage["Config"] ) !="undefined" ) 
{
var PageArray = JSON.parse(localStorage["Config"]).Page;

}
else
{
PageArray=[];
}
PageArray.push(Page);
Config = {Page:PageArray};

localStorage["Config"]=JSON.stringify(Config);
window.close();
})


