Ext.define('Gl.library.box.tools.DefaultConfigfdv', {
    extend: 'Gl.library.box.tools.DefaultConfig',
    
    attachRefs:function(controller){
        var me = this;
        var curRefs = controller.refs;
        var refs = [
            {
                ref: 'grid',
                selector: me.moduleName + 'grid'
            },
            {
                ref: 'formsearch',
                selector: me.moduleName + 'formsearch'
            },
            {
                ref: 'formdata',
                selector: me.moduleName + 'formdata'
            },
            {
                ref: 'panel',
                selector: me.moduleName + 'panel'
            }

        ];
        for(var i in curRefs){
            refs.push(curRefs[i]);
        }
        return refs;
    }

});