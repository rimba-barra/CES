Ext.define('Hrd.controller.Worklocationprojectpt', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Worklocationprojectpt',
    controllerName: 'worklocationprojectpt',
    fieldName: 'worklocation',
    bindPrefixName: 'Worklocationprojectpt',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    dynamicrequest: null,
    refs: [
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();

        this.control(newEvs);
     
        
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.masterworklocation, f.down("[name=worklocation_id]")).comboBox();
                me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox();
            }
        }).read('detail');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.masterworklocation, f.down("[name=worklocation_id]")).comboBox();
                        me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox();
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.masterworklocation, f.down("[name=worklocation_id]")).comboBox();
                        me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        console.log(rec.get('private'));
                        
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    }

});