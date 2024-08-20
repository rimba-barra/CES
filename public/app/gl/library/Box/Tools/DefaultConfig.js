Ext.define('Gl.library.box.tools.DefaultConfig', {
    moduleName: '',
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    run:function(controller){
        Ext.apply(controller, {
            refs:this.attachRefs(controller),
            views:this.attachViews(controller)
        });
      
    },
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
            }

        ];
        for(var i in curRefs){
            refs.push(curRefs[i]);
        }
        return refs;
    },
    attachViews: function(controller) {
        var me = this;
        var curViews = controller.views;
      
        var views = [me.moduleName+'.Panel', me.moduleName+'.Grid', me.moduleName+'.FormSearch', me.moduleName+'.FormData'];
        for(var i in curViews){
            views.push(curViews[i]);
        }
        return views;
        Ext.apply(controller, {
            views:views
        });
    }

});