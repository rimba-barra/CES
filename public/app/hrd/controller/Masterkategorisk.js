Ext.define('Hrd.controller.Masterkategorisk', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Masterkategorisk',
    controllerName: 'masterkategorisk',
    fieldName: 'name',
    bindPrefixName: 'Masterkategorisk',
    uploadFotoKlik:0,
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        this.control(newEvs);
     
        
    }
});