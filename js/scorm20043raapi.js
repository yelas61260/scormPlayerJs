function APIAdapter2004() {
};
var API_1484_11 = APIAdapter2004;
APIAdapter2004.Commit = function(arg1) {
	if(api_result[0] == 'true'){
		api_result[1] = '0';
		return 'true';
	}else if(api_result[0] == 'false'){
		api_result[1] = '143';
		return 'false';
	}else{
		api_result[1] = '142';
		return 'false';
	}
};
APIAdapter2004.GetDiagnostic = function(arg1) {
	return peticionAjax("GET", "getdiagnostic/"+api_result[1], null, false);
};
APIAdapter2004.GetErrorString = function(arg1) {
	return peticionAjax("GET", "geterrorstring/"+arg1, null, false);
};
APIAdapter2004.GetLastError = function() {
	return api_result[1];
};
APIAdapter2004.GetValue = function (arg1) {
    if (Terminated) {
        api_result[1] = '123';
        return 'false';
    }
    if (!Initialized) {
        api_result[1] = '122';
        return 'false';
    }
    if (arg1 == "") {
        api_result[1] = '301';
        return '';
    }
    var scormObject = getValue(arg1);
    if (scormObject == null) {
        api_result[1] = '301';
        return '';
    }
    if (!scormObject["actionAccepted"].includes("R")) {
        api_result[1] = '301';
        return '';
    }

    api_result[1] = "0";
    return scormObject["valueObjet"];
};
APIAdapter2004.SetValue = function (arg1, arg2) {
    if (Terminated) {
        api_result[1] = '133';
        return 'false';
    }
    if (!Initialized) {
        api_result[1] = '132';
        return 'false';
    }
    if (arg1 == "") {
        api_result[1] = '351';
        return 'false';
    }
    var scormObject = getValue(arg1);
    if (scormObject == null) {
        api_result[1] = '351';
        return '';
    }
    if (!scormObject["actionAccepted"].includes("W")) {
        api_result[1] = '404';
        return '';
    }
    if (!validateValueScorm(arg2, window[scormObject["type_data_12"]])) {
        api_result[1] = '406';
        return '';
    }
    if (!validateSizeScorm(arg2, scormObject["range_data_12"])) {
        api_result[1] = '407';
        return '';
    }

    scormObject = setValue(arg1, arg2);
    api_result[1] = "0";
    if (arg1 == "cmi.completion_status" && (arg2 == "completed" || arg2 == "passed")) {
        completeLessonLMS();
    }
    return scormObject["valueObjet"];
};
APIAdapter2004.Initialize = function(arg1) {
    if(Initialized){
        api_result[0] = 'true';
        api_result[1] = '103';
        return 'false';
    }
    if(Terminated){
        api_result[0] = 'false';
        api_result[1] = '104';
        return 'false';
    }
	api_result[0] = 'true';
	api_result[1] = '0';
	Initialized = true;
	return 'true';
};
APIAdapter2004.Terminate = function (arg1) {
    if (Terminated) {
        api_result[1] = '113';
        return 'false';
    }
    if (!Initialized) {
        api_result[1] = '112';
        return 'false';
    }
    
    Initialized = false;
    Terminated = true;
    api_result[1] = '0';
    return 'true';
};
