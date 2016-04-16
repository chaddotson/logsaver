


(function() {
    'use strict';
    
    var _root = this;
    
    var _localStorageKeyForLog = ""
    var _includeTimestamp = false;
    
    var _originalLog;
    
    
    function _isEnabled() {
        return _localStorageKeyForLog !== "";
    }
    
    _root.clearPreservedLog = function () {
        if(_isEnabled()) {
            localStorage[_localStorageKeyForLog] = ""
        }
    };
    
    _root.removePreservedLog = function () {
        if(_isEnabled()) {
            localStorage.removeItem(_localStorageKeyForLog);
        }
    };
    
    _root.stopPreservingLog = function () {
        if(!_isEnabled()) {
            return;
        }
        
        console.log = _originalLog;
        console.log("console.log preservation disabled.");
    };
    
    _root.startPreservingLog = function (options) {
        if(_isEnabled()) {
            _originalLog.apply(console, "console.log preservation already enabled.");
            return;
        }
        
        timestampFormatter = Date.toLocaleString;
        if(options.timestampFormatter) {
            timestampFormatter = options.timestampFormatter;
        }
        
        console.log = function(){
            oldLog.apply(console,arguments);
            var timestamp = new Date();
                        
            var formattedTimestamp = dateFormatter.apply()
            
            
            var message =  "\n "+ formattedTimestamp + " :: " + Array.prototype.join.call(arguments," , "); // the arguments
            localStorage[_localStorageKeyForLog] += message; 
        }
        
        _originalLog.apply(console, "console.log preservation enabled.");
    };
    
    
})(this);
