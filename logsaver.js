


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
    
    function _zeroPad(str) {
        str = str + ""; // force it to be a string.
        return ((str.length < 2) ? "0" + str : str);
    
    }
    
    function _formatDate() {
       return this.getFullYear() + "/" + _zeroPad(this.getMonth()) + "/" + _zeroPad(this.getDay()) + " - " + _zeroPad(this.getHours()) + ":" + _zeroPad(this.getMinutes()) + ":" + _zeroPad(this.getSeconds());
    }
    
    _root.clearSavededLog = function () {        
        if(localStorage[_localStorageKeyForLog]) {
            localStorage[_localStorageKeyForLog] = "";
        }
    };
    
    _root.removeSavedLog = function () {
        if(localStorage[_localStorageKeyForLog] !== undefined) {
            localStorage.removeItem(_localStorageKeyForLog);
        }
    };
    
    _root.stopSavingLog = function () {
        if(!_isEnabled()) {
            console.log("No longer saving console.log to localStorage.");
            return;
        }
        
        console.log = _originalLog;
        _originalLog = undefined;
        console.log("console.log preservation disabled.");
    };
    
    _root.startSavingLog = function (options) {
        options = options || {};
                
        if(_isEnabled()) {
            _originalLog.call(console, "Already saving console.log. localStorage Key:" + _localStorageKeyForLog);
            return;
        }
                
        _localStorageKeyForLog = options.keyForLocalStorage || _localStorageKeyForLog;
        var timestampFormatter = options.timestampFormatter || _formatDate; 
        
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
                    _originalLog.apply(console, arguments.splice(0, 0, "SAVE FAILED - LOCAL STORAGE QUOTA EXCEEDED"));
                } else {
                    _originalLog.apply(console, arguments.splice(0, 0, "SAVE FAILED"));
                }
                
            }
        }
        
        _originalLog.call(console, "Now saving console.log to localStorage Key:" + _localStorageKeyForLog);
    };
        
})(this);