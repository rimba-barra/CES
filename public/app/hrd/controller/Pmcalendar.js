Ext.define('Hrd.controller.Pmcalendar', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Pmcalendar',
    controllerName: 'pmcalendar',
    fieldName: 'pm_calendar_id',
    bindPrefixName: 'Pmcalendar',
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
                        me.tools.wesea(data.type, f.down("[name=pm_calendar_type_id]")).comboBox();
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.type, f.down("[name=pm_calendar_type_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
});