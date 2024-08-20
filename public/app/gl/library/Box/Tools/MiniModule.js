Ext.define('Gl.library.box.tools.MiniModule', {
    controllerName: '',
    refs:[],
    constructor: function(options) {
        var me = this;
        Ext.apply(this, options || {});
  
       
    },
    getController: function() {
        return _Apps.getController(this.controllerName);
    },
    /* implement this method*/
    getEvents: function() {
        var me = this;
        var newEvs = {};
       
        return newEvs;
    }

});




