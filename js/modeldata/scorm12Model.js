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

