Ext.define('Hrd.controller.Globalparameter', {
    extend: 'Hrd.template.ControllerForMasterDirect',
    alias: 'controller.Globalparameter',
    controllerName: 'globalparameter',
    fieldName: 'globalparameter',
    formWidth: 600,
    bindPrefixName: 'Globalparameter',
    init: function() {
        var me = this;
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));

        var newEvs = {};
        newEvs['globalparameterformdata button[action=test]'] = {
            click: function() {
                me.testProject();
            }

        };

        this.control(newEvs);

    },
    testProject: function() {
        var me = this;
        var p = me.getPanel();
        me.tools.ajax({
            params: {},
            fail: function(msg, data) {

                p.setLoading(false);
            },
            success: function(data) {
                p.setLoading(false);
               // p.up("window").close();
                me.tools.alert.info("Success!");
            }
        }).process('testproject');
    }
});