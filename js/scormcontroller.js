var id_scorm = 0;
var id_sco = 0;
var id_user = 0;
var param_ruta = "";

var datamodel = null;
var Initialized = false;
var Terminated = false;
var errorCode = "0";

var syncDataScorm = null;
var syncSeconds = 30;

$( document ).ready(function() {
	id_scorm = $("#id_scorm").html();
	id_sco = $("#id_sco").html();
	id_user = $("#id_user").html();
	param_ruta = $("#apiPlayerService").html();
});
var api_result = new Array('','0');
peticionAjax = function(mehod, url, objectSend){
	var http = new XMLHttpRequest();
	http.open(""+mehod, param_ruta+url+"");
	http.setRequestHeader("Content-Type", "application/json");
	http.onreadystatechange = function() {}
	http.send(JSON.stringify(objectSend));
	
	if (http.status == 200 || http.status == "") {
		responseAsText = http.responseText;
		return responseAsText;
	}
	return "";
}
function initializeDataModel() {
	datamodel = JSON.parse(peticionAjax("GET", "data/all/"+id_user+"/"+id_sco, null));
    syncDataScorm = setInterval(syncScorm, syncSeconds*1000)
	return true;
}
function terminateDataModel() {
    clearInterval(syncDataScorm);
    syncScorm();
	return true;
}
function syncScorm() {
    console.log("send data")
    response = peticionAjax("POST", "data/all/"+id_user+"/"+id_sco+"/save", datamodel);
    console.log(response)
    if (response === null || response === "") {
        Terminated = true;
        Initialized = false;
    }
}
function setValue(label, value) {
	replaceElement("scorm_12", label, value);
	return getValue(label);
}
function getValue(label) {
	value = findElement("scorm_12",label);
	if (value == null) {
		var paramBase = label.replace(new RegExp(".(\\d+).", "g"), ".n.");
		value = findElement("scorm_12", paramBase);
	}
    if (value != null && value["valueObjet"] == null) {
        value["valueObjet"] = "";
    }
	return value;
}
function findElement(propName, propValue) {
	for (var i=0; i < datamodel.length; i++) {
		if (datamodel[i][propName] == propValue) {
			return datamodel[i];
		}
	}
	return null;
}
function replaceElement(propName, propValue, dataValue) {
    for (var i = 0; i < datamodel.length; i++) {
        if (datamodel[i][propName] == propValue) {
            datamodel[i]["valueObjet"] = dataValue;
            return;
        }
    }
    var paramBase = propValue.replace(new RegExp(".(\\d+).", "g"), ".n.");
    var elementBase = findElement(propName, paramBase);
    if (elementBase != null) {
        elementBase["scorm_12"] = propValue;
        elementBase["scorm_2004_3ra"] = propValue;
        elementBase["valueObjet"] = dataValue;

        datamodel.push(elementBase);
    }
}
function validateValueScorm(value, regex) {
    expression = new RegExp(regex);
    value = value + '';
    matches = value.match(expression);
    if (matches != null) {
        return true;
    }
    return false;
}

function validateSizeScorm(value, range) {
    if (range == "") {
        return true;
    }
    ranges = range.split('#');
    value = value * 1.0;
    if ((value >= ranges[0]) && (value <= ranges[1])) {
        return true;
    }
    return false;
}