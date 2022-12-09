function APIAdapter12() {
};
var API = APIAdapter12;
APIAdapter12.LMSCommit = function(arg1) {
	if(Initialized){
		api_result[1] = '0';
		return 'true';
	}else{
		api_result[1] = '301';//
		return 'false';
	}
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
	if(Initialized){
		if (arg1 != "") {
			var scormObject = getValue(arg1);
			if (scormObject != null) {
				if (scormObject["actionAccepted"].includes("R")) {
					api_result[1] = "0";
					return scormObject["valueObjet"];
				} else {
					api_result[1] = '404';//
					return '';
				}
			} else {
				api_result[1] = '201';//
				return '';
			}
		}else{
			api_result[1] = '201';//
			return '';
		}
	}else{
		api_result[1] = '301';//
		return '';
	}
};
APIAdapter12.LMSSetValue = function(arg1, arg2) {
	if(Initialized) {
		if (arg1 != "") {
			var scormObject = getValue(arg1);
			if (scormObject != null) {
				if (scormObject["actionAccepted"].includes("W")) {
					if (validateValueScorm(arg2, window[scormObject["type_data_12"]])) {
						if (validateSizeScorm(arg2, scormObject["range_data_12"])) {
							scormObject = setValue(arg1, arg2);
							api_result[1] = "0";

							if(arg1=="cmi.core.lesson_status" && (arg2=="completed" || arg2=="passed")){
								completeLessonLMS();
							}
							return scormObject["valueObjet"];
						} else {
							api_result[1] = '405';//
							return '';
						}
					} else {
						api_result[1] = '405';//
						return '';
					}
				} else {
					api_result[1] = '405';//
					return '';
				}
			} else {
				api_result[1] = '201';//
				return '';
			}
		} else {
			api_result[1] = '201';
			return 'false';
		}
	}else{
		api_result[1] = '301';
		return 'false';
	}
};
APIAdapter12.LMSInitialize = function(arg1) {
	if(!Initialized && initializeDataModel()){
		api_result[0] = 'true';
		api_result[1] = '0';
		Initialized = true;
		return 'true';
	}else{
		api_result[0] = 'false';
		api_result[1] = '101';
		return 'false';
	}
};
APIAdapter12.LMSFinish = function(arg1) {
	if(Initialized && terminateDataModel()){
		api_result[0] = 'false';
		api_result[1] = '0';
		Initialized = false;
		return 'true';
	}else{
		api_result[1] = '301';//
		return 'false';
	}
};

//Validator
var CMIString256 = '^[\\u0000-\\uFFFF]{1,256}$';
var CMIString4096 = '^[\\u0000-\\uFFFF]{1,4096}$';
var CMITime = '^([0-2]{1}[0-9]{1}):([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})(\.[0-9]{1,2})?$';
var CMITimespan = '^([0-9]{2,4}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,2})?$';
var CMIInteger = '^\\d+$';
var CMISInteger = '^-?([0-9]+)$';
var CMIDecimal = '^-?([0-9]{0,3})(\.[0-9]*)?$';
var CMIIdentifier = '^[\\u0021-\\u007E]{0,255}$';
var CMIIndex = '[._](\\d+).';
var CMIStatus = '^passed$|^completed$|^failed$|^incomplete$|^browsed$';
var CMIStatus2 = '^passed$|^completed$|^failed$|^incomplete$|^browsed$|^not attempted$';
var CMIExit = '^time-out$|^suspend$|^logout$|^$';
var CMIType = '^true-false$|^choice$|^fill-in$|^matching$|^performance$|^sequencing$|^likert$|^numeric$';
var CMIResult = '^correct$|^wrong$|^unanticipated$|^neutral$|^([0-9]{0,3})?(\.[0-9]*)?$';
var NAVEvent = '^previous$|^continue$';