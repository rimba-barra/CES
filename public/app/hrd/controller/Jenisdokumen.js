Ext.define('Hrd.controller.Jenisdokumen', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Jenisdokumen',
    controllerName: 'jenisdokumen',
    fieldName: 'code',
    bindPrefixName: 'Jenisdokumen',
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
						f.down("[name=code]").setReadOnly(false);

                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
						f.down("[name=code]").setReadOnly(true);
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
		
    },
});