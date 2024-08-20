Ext.define('Hrd.controller.Negaratujuan', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Negaratujuan',
    controllerName: 'negaratujuan',
    fieldName: 'negaratujuan',
    bindPrefixName: 'Negaratujuan',
    formWidth: 600,
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        console.log("INIT....");
        
        
        this.control(newEvs);
     
        
    }
   
});