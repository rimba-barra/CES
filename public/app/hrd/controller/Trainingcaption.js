Ext.define('Hrd.controller.Trainingcaption', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingcaption',
    controllerName: 'trainingcaption',
    fieldName: 'caption',
    bindPrefixName: 'Trainingcaption',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        this.control(newEvs);
    },


});