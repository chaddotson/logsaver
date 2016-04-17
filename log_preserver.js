


(function(root) {
    'use strict';
    console.log(window);
    
    var _root = root;
    
    var _localStorageKeyForLog = "console.log.saved";
    var _includeTimestamp = false;
    var _originalLog;
    
    
    function _isEnabled() {
        return _originalLog !== undefined;
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
            console.log("console.log preservation not enabled.");
            return;
        }
        
        console.log = _originalLog;
        _originalLog = undefined;
        console.log("console.log preservation disabled.");
    };
    
    _root.startPreservingLog = function (options) {
        options = options || {};
                
        if(_isEnabled()) {
            _originalLog.call(console, "console.log preservation already enabled.");
            return;
        }
                
        _localStorageKeyForLog = options.keyForLocalStorage || _localStorageKeyForLog;
        var timestampFormatter = options.timestampFormatter || Date.toLocaleString; 
        
        _originalLog = console.log;
        
        console.log = function(){
            _originalLog.apply(console, arguments);
                                    
            var formattedTimestamp = timestampFormatter.apply(new Date());
                        
            var message =  "\n "+ formattedTimestamp + " :: " + Array.prototype.join.call(arguments, ", ");
            
            try {
                if(!localStorage[_localStorageKeyForLog]) {
                    localStorage[_localStorageKeyForLog] = "";
                }
                localStorage[_localStorageKeyForLog] += message;    
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    _originalLog.apply(console, arguments.splice(0, 0, "PRESERVATION FAILED - LOCAL STORAGE QUOTA EXCEEDED"));
                } else {
                    // TODO: What to do...
                }
                
            }
        }
        
        _originalLog.call(console, "console.log preservation enabled.");
    };
        
})(this);
