Ext.define('Hrd.controller.Variabelgaji', {
    extend: 'Hrd.template.ControllerForMasterDirect',
    alias: 'controller.Variabelgaji',
    controllerName: 'variabelgaji',
    fieldName: 'bank_id',
    formWidth: 600,
    bindPrefixName: 'Variabelgaji',
    loadPage: function(store) {
        var me = this;

        me.tools.ajax({
            params: {
            },
            success: function(data, model) {
                me.tools.wesea(data.komponengaji, me.getFormdata().down("[name=komponengaji_komponengaji_id]")).comboBox();
                store.loadPage(1, {
                    callback: function(rec, operation, success) {
                        var g = me.getGrid();
                        if (!g.getStore().modelExist) {

                            g.attachModel(operation);
                        }


                        if (g.getStore().getCount() > 0) { // select first record
                            g.getSelectionModel().select(0);
                        }

                    }
                });


               // p.setLoading(false);
            }
        }).read('parameter');



        // me.getGrid().xLoad();
    },
});