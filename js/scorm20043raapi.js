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
APIAdapter2004.GetValue = function(arg1) {
	if((Initialized) && (!Terminated)){
		if (arg1 != "") {
			var scormObject = getValue(arg1);
			if (scormObject != null) {
				if (scormObject["actionAccepted"].includes("R")) {
					api_result[1] = "0";
					return scormObject["valueObjet"];
				} else {
					api_result[1] = '301';//
					return '';
				}
			} else {
				api_result[1] = '301';//
				return '';
			}
		}else{
			api_result[1] = '301';//
			return '';
		}
	}else{
		if (Terminated) {
			api_result[1] = '123';
			return 'false';
		} else {
			api_result[1] = '122';
			return 'false';
		}
	}
};
APIAdapter2004.SetValue = function(arg1, arg2) {
	if((Initialized) && (!Terminated)) {
		if (arg1 != "") {
			var scormObject = getValue(arg1);
			if (scormObject != null) {
				if (scormObject["actionAccepted"].includes("W")) {
					if (validateValueScorm(arg2, window[scormObject["type_data_12"]])) {
						if (validateSizeScorm(arg2, scormObject["range_data_12"])) {
							scormObject = setValue(arg1, arg2);
							api_result[1] = "0";

							if(arg1=="cmi.completion_status" && (arg2=="completed" || arg2=="passed")){
								completeLessonLMS();
							}
							return scormObject["valueObjet"];
						} else {
							api_result[1] = '407';//
							return '';
						}
					} else {
						api_result[1] = '406';//
						return '';
					}
				} else {
					api_result[1] = '404';//
					return '';
				}
			} else {
				api_result[1] = '351';//
				return '';
			}
		} else {
			api_result[1] = '351';
			return 'false';
		}
	}else{
		if (Terminated) {
			api_result[1] = '133';
			return 'false';
		} else {
			api_result[1] = '132';
			return 'false';
		}
	}
};
APIAdapter2004.Initialize = function(arg1) {
	if((!Initialized) && (!Terminated)){
		api_result[0] = 'true';
		api_result[1] = '0';
		Initialized = true;
		return 'true';
	}else {
		if(Initialized){
			api_result[0] = 'true';
			api_result[1] = '103';
			return 'false';
		}else {
			api_result[0] = 'false';
			api_result[1] = '104';
			return 'false';
		}
	}
	return 'false';
};
APIAdapter2004.Terminate = function(arg1) {
	if((Initialized) && (!Terminated)){
		if (terminateDataModel) {
			Initialized = false;
			Terminated = true;
			api_result[1] = '0';
			return 'true';			
		} else {
			return 'false';
		}
	} else {
		if (Terminated) {
			api_result[1] = '113';
			return 'false';
		} else {
			api_result[1] = '112';
			return 'false';
		}
	}
};

var CMIString200 = '^[\\u0000-\\uFFFF]{0,200}$';
var CMIString250 = '^[\\u0000-\\uFFFF]{0,250}$';
var CMIString1000 = '^[\\u0000-\\uFFFF]{0,1000}$';
var CMIString4000 = '^[\\u0000-\\uFFFF]{0,4000}$';
var CMIString64000 = '^[\\u0000-\\uFFFF]{0,64000}$';
var CMILang = '^([a-zA-Z]{2,3}|i|x)(\-[a-zA-Z0-9\-]{2,8})?$|^$';
var CMILangString250 = '^(\{lang=([a-zA-Z]{2,3}|i|x)(\-[a-zA-Z0-9\-]{2,8})?\})?([^\{].{0,250}$)?';
var CMILangcr = '^((\{lang=([a-zA-Z]{2,3}|i|x)?(\-[a-zA-Z0-9\-]{2,8})?\}))(.*?)$';
var CMILangString250cr = '^((\{lang=([a-zA-Z]{2,3}|i|x)?(\-[a-zA-Z0-9\-]{2,8})?\})?(.{0,250})?)?$';
var CMILangString4000 = '^(\{lang=([a-zA-Z]{2,3}|i|x)(\-[a-zA-Z0-9\-]{2,8})?\})?([^\{].{0,4000}$)?';
var CMITime = '^(19[7-9]{1}[0-9]{1}|20[0-2]{1}[0-9]{1}|203[0-8]{1})((-(0[1-9]{1}|1[0-2]{1}))((-(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}))(T([0-1]{1}[0-9]{1}|2[0-3]{1})((:[0-5]{1}[0-9]{1})((:[0-5]{1}[0-9]{1})((\\.[0-9]{1,2})((Z|([+|-]([0-1]{1}[0-9]{1}|2[0-3]{1})))(:[0-5]{1}[0-9]{1})?)?)?)?)?)?)?)?$';
var CMITimespan = '^P(\\d+Y)?(\\d+M)?(\\d+D)?(T(((\\d+H)(\\d+M)?(\\d+(\.\\d{1,2})?S)?)|((\\d+M)(\\d+(\.\\d{1,2})?S)?)|((\\d+(\.\\d{1,2})?S))))?$';
var CMIInteger = '^\\d+$';
var CMISInteger = '^-?([0-9]+)$';
var CMIDecimal = '^-?([0-9]{1,5})(\\.[0-9]{1,18})?$';
var CMIIdentifier = '^\\S{1,250}[a-zA-Z0-9]$';
var CMIShortIdentifier = '^[\\w\.]{1,250}$';
var CMILongIdentifier = '^(?:(?!urn:)\\S{1,4000}|urn:[A-Za-z0-9-]{1,31}:\\S{1,4000})$';
var CMIFeedback = '^.*$'; // This must be redefined
var CMIIndex = '[._](\\d+).';
var CMIIndexStore = '.N(\\d+).';
var CMICStatus = '^completed$|^incomplete$|^not attempted$|^unknown$';
var CMISStatus = '^passed$|^failed$|^unknown$';
var CMIExit = '^time-out$|^suspend$|^logout$|^normal$|^$';
var CMIType = '^true-false$|^choice$|^(long-)?fill-in$|^matching$|^performance$|^sequencing$|^likert$|^numeric$|^other$';
var CMIResult = '^correct$|^incorrect$|^unanticipated$|^neutral$|^-?([0-9]{1,4})(\\.[0-9]{1,18})?$';
var NAVEvent = '^previous$|^continue$|^exit$|^exitAll$|^abandon$|^abandonAll$|^suspendAll$|^\{target=\\S{0,200}[a-zA-Z0-9]\}choice|jump$';
var NAVBoolean = '^unknown$|^true$|^false$';
var NAVTarget = '^previous$|^continue$|^choice.{target=\\S{0,200}[a-zA-Z0-9]}$'