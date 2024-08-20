Ext.define('Hrd.controller.Shifttype', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Shifttype',
    controllerName: 'shifttype',
    fieldName: 'shifttype',
    formWidth: 600,
    bindPrefixName: 'Shifttype',
    init: function() {
        var me = this;
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        /* added 27 Agustus */
        var hourObjects = ['in_time','out_time','outafter_time'];
        for (var x in hourObjects) {
            this.control(events.timeInput('shifttypeformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }
     
        
    }
});