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
APIAdapter12.LMSGetDiagnostic = function(arg1) {
	return peticionAjax("GET", "getdiagnostic/"+arg1, null, false);
};
APIAdapter12.LMSGetErrorString = function(arg1) {
	return peticionAjax("GET", "geterrorstring/"+arg1, null, false);
};
APIAdapter12.LMSGetLastError = function() {
	return api_result[1];
};
APIAdapter12.LMSGetValue = function(arg1) {
	if(!Initialized){
		api_result[1] = '301';
		return '';
	}
    if (arg1 == "") {
        api_result[1] = '201';
        return '';
    }
    var scormObject = getValue(arg1);
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
APIAdapter12.LMSSetValue = function (arg1, arg2) {
    if (!Initialized) {
        api_result[1] = '301';
        return 'false';
    }
    if (arg1 == "") {
        api_result[1] = '201';
        return 'false';
    }
    var scormObject = getValue(arg1);
    if (scormObject == null) {
        api_result[1] = '201';
        return '';
    }
    if (!scormObject["actionAccepted"].includes("W")) {
        api_result[1] = '405';
        return '';
    }
    if (!validateValueScorm(arg2, window[scormObject["type_data_12"]])) {
        api_result[1] = '405';
        return '';
    }
    if (!validateSizeScorm(arg2, scormObject["range_data_12"])) {
        api_result[1] = '405';
        return '';
    }

    scormObject = setValue(arg1, arg2);
    api_result[1] = "0";
    if (arg1 == "cmi.core.lesson_status" && (arg2 == "completed" || arg2 == "passed")) {
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
