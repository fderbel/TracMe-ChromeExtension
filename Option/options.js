
// event ADD

 var ADD = document.getElementById('ADD');
 var obt = document.getElementById('Activities');
 
 ADD.addEventListener("click", function() { 
 createElement ("");
 });



// event Save


$("#options").on('submit', function(event) {
  event.preventDefault();
  var Activities= [];
  $.each($(this).serializeArray(), function(_, kv) {
    if (kv.name == "Trace_Name") {
    Activities.push(kv.value);
    localStorage["trace_options_"+kv.name]=JSON.stringify(Activities)
    
    }
    
    else 
    localStorage["trace_options_"+kv.name] = kv.value;
  });
  window.close();
});








$('document').ready(function() {
    $("#options *[name='first_name']").val(localStorage["trace_options_first_name"]);
    $("#options *[name='last_name']").val(localStorage["trace_options_last_name"]);
    $("#options *[name='email']").val(localStorage["trace_options_email"]);
    $("#options *[name='Base_URI']").val(localStorage["trace_options_Base_URI"]);
    $("#options *[name='Model_URI']").val(localStorage["trace_options_Model_URI"]);
    var Activities = JSON.parse(localStorage["trace_options_Trace_Name"]);
    for (i=0;i<Activities.length;i++)
    { 
    if (i==0) {$("#options *[name='Trace_Name']").val(Activities[i]);}
    else {createElement (Activities[i]); }
    
    }
    
    
});


function createElement (val) {
var label = document.createElement("label");
label.setAttribute('for','Trace_Name');
label.setAttribute('class','control-label input-group-addon');
var input = document.createElement("input");
input.setAttribute('name','Trace_Name');
input.setAttribute('type','text');
input.setAttribute('class','form-control');
input.setAttribute ('value',val);
obt.appendChild(label);
obt.appendChild(input);}
