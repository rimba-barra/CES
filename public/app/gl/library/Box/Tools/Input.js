Ext.define('Gl.library.box.tools.Input', {
    getNumber:function(el){
        var nil = 0;
        if(el){
            var v = parseInt(el.getValue);
            nil = isNaN(v)?0:v;
        }
        return nil;
        
    }
});