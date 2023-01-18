var passedTest = 0;
let totalTest = 0;


peticionAjax = function(mehod, url, objectSend){
	if(mehod === "GET"){
        return "[]";
    }
    if(mehod === "POST"){
        return "{\"status\":\"200\",\"description\":\"OK\"}";
    }
}
function validateResponse(functionName, expectCode, expectValue) {
    console.log("------------------------");
    var targetValue = functionName();
    totalTest++
    console.log("test: ", functionName.name);
    console.log("code: expect", expectCode, " value: ", api_result[1]);
    console.log("value: expect", expectValue, " value: ", targetValue);
    if (api_result[1] != expectCode || targetValue != expectValue) {
        console.log("TEST FAIL");
    }else{
        console.log("TEST OK");
        passedTest++;
    }
    console.log("------------------------");
}
function scorm12GetRWTestSuccess() {
    return API.LMSGetValue("cmi.core.lesson_location");
}
function scorm12GetROTestSuccess() {
    return API.LMSGetValue("cmi.core.student_name");
}
function scorm12GETWOTestFail() {
    return API.LMSGetValue("cmi.core.exit");
}
function scorm12GETNotExistTestFail() {
    return API.LMSGetValue("cmi.core.lesson_locationnn");
}

function scorm12SetRWTestSuccess() {
    return API.LMSSetValue("cmi.core.lesson_location", "1,0,0");
}
function scorm12SetWOTestSuccess() {
    return API.LMSSetValue("cmi.exit", "timeout");
}
function scorm12SetDataTypeNumberTestSuccess() {
    return API.LMSSetValue("cmi.objectives.n.score.raw", "10");
}
function scorm12SetDataTypeEnumTestSeccess() {
    return API.LMSSetValue("cmi.core.lesson_status", "passed");
}
function scorm12SetROTestFail() {
    return API.LMSSetValue("cmi.core.student_name", "estudiante");
}
function scorm12SetNotExistTestFail() {
    return API.LMSSetValue("cmi.core.lesson_locationnn", "1,0,0");
}
function scorm12SetDataTypeNumberTestFail() {
    return API.LMSSetValue("cmi.objectives.n.score.raw", "1,0,0");
}
function scorm12SetDataTypeEnumTestFail() {
    return API.LMSSetValue("cmi.core.lesson_status", "aprove");
}

function initTest() {
    API.LMSInitialize();
    validateResponse(scorm12GetRWTestSuccess, "0", "1,0,0");
    validateResponse(scorm12GetROTestSuccess, "0", "Estudiante 1");
    validateResponse(scorm12GETWOTestFail, "404", "");
    validateResponse(scorm12GETNotExistTestFail, "201", "");
    validateResponse(scorm12SetRWTestSuccess, "0", "");
    validateResponse(scorm12SetWOTestSuccess, "0", "");
    validateResponse(scorm12SetDataTypeNumberTestSuccess, "0", "");
    validateResponse(scorm12SetDataTypeEnumTestSeccess, "0", "");
    validateResponse(scorm12SetROTestFail, "403", "");
    validateResponse(scorm12SetNotExistTestFail, "201", "");
    validateResponse(scorm12SetDataTypeNumberTestFail, "405", "");
    validateResponse(scorm12SetDataTypeEnumTestFail, "405", "");
    API.LMSFinish();
    console.log("Total test: ", totalTest, " passed Test: ", passedTest, " fail test: ", (totalTest-passedTest));
}
initTest();