function APIAdapter12() {
};
var API = APIAdapter12;
APIAdapter12.LMSCommit = function(arg1) {
	if(Initialized){
		api_result[1] = '0';
		return 'true';
	}
	api_result[1] = '301';
	return 'false';
};
APIAdapter12.LMSGetDiagnostic = function(code) {
	return peticionAjax("GET", "getdiagnostic/"+code, null, false);
};
APIAdapter12.LMSGetErrorString = function(code) {
	return peticionAjax("GET", "geterrorstring/"+code, null, false);
};
APIAdapter12.LMSGetLastError = function() {
	return api_result[1];
};
APIAdapter12.LMSGetValue = function(label) {
	if(!Initialized){
		api_result[1] = '301';
		return '';
	}
    if (label == "") {
        api_result[1] = '201';
        return '';
    }
    var scormObject = getValue(label);
    if (scormObject == null) {
        api_result[1] = '201';
        return '';
    }
    if (!scormObject["actionAccepted"].includes("R")) {
        api_result[1] = '404';
        return '';
    }

    api_result[1] = "0";
    return scormObject["valueObjet"];
};
APIAdapter12.LMSSetValue = function (label, value) {
    if (!Initialized) {
        api_result[1] = '301';
        return 'false';
    }
    if (label == "") {
        api_result[1] = '201';
        return 'false';
    }
    var scormObject = getValue(label);
    if (scormObject == null) {
        api_result[1] = '201';
        return '';
    }
    if (!scormObject["actionAccepted"].includes("W")) {
        api_result[1] = '405';
        return '';
    }
    if (!validateValueScorm(value, window[scormObject["type_data_12"]])) {
        api_result[1] = '405';
        return '';
    }
    if (!validateSizeScorm(value, scormObject["range_data_12"])) {
        api_result[1] = '405';
        return '';
    }

    scormObject = setValue(label, value);
    api_result[1] = "0";
    if (label == "cmi.core.lesson_status" && (value == "completed" || value == "passed")) {
        completeLessonLMS();
    }
    return scormObject["valueObjet"];
};
APIAdapter12.LMSInitialize = function(arg1) {
	if(!Initialized && initializeDataModel()){
		api_result[0] = 'true';
		api_result[1] = '0';
		Initialized = true;
		return 'true';
	}
	api_result[0] = 'false';
	api_result[1] = '101';
	return 'false';
};
APIAdapter12.LMSFinish = function(arg1) {
	if(Initialized && terminateDataModel()){
		api_result[0] = 'false';
		api_result[1] = '0';
		Initialized = false;
		return 'true';
	}
	api_result[1] = '301';
	return 'false';
};
