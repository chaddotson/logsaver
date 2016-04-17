# logsaver.js
logsaver.js provides the ability to save console.log messages to localStorage.

### Start Saving Console Log 

```javascript
startSavingLog();
```

You can change the localStorage key used.

```javascript
startSavingLog({keyForLocalStorage:"SOME_NEW_KEY"});
```

You can also modify the date formatter.  Simply specify a new one.

```javascript
startSavingLog({timestampFormatter:Date.toUTCString});
```

### Stop Saving Console Log

```javascript
stopSavingLog();
```

### Cleare the Saved Logs

```javascript
clearSavedLog();
```

### Completely Remove the Saved Log

```javascript
removeSavedLog();
```