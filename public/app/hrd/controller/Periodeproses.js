Ext.define('Hrd.controller.Periodeproses', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Periodeproses',
    controllerName: 'periodeproses',
    fieldName: 'periodeproses_id',
    bindPrefixName: 'Periodeproses',
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
                        me.tools.wesea(data.statusperiode, f.down("[name=statusperiode_id]")).comboBox();
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.statusperiode, f.down("[name=statusperiode_id]")).comboBox();
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