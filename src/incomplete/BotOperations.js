var BotOperations = new function () {
    this.main = function (args) {
        // Remember a value
        GM_setValue('foo' + 'bar');
        
        // Alert all stored values
        for each (var val in GM_listValues()) {
          alert(val + ' : ' + GM_getValue(val));
        }
        
        // Reset array
        for each (var key in GM_listValues()) {
          GM_deleteValue(key);
        }
    };
};
