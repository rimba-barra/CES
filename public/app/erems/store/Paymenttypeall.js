Ext.define('Erems.store.Paymenttypeall', {
    extend: 'Ext.data.Store',
    alias: 'store.paymenttypeallstore',
    requires: [
        'Erems.model.Paymenttype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymenttypeallStore',
                model: 'Erems.model.Paymenttype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        // create: 'POST',
                        // update: 'POST',
                        // destroy: 'POST'
                    },
                    api: {
                        read: 'erems/schedulebiayalainlain/read',
                        // create: 'erems/purchaseletter/create',
                        // update: 'erems/purchaseletter/update',
                        // destroy: 'erems/purchaseletter/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'paymenttype_id',
                        root: 'data'
                    },
                    //gak ngefek
                    extraParams: {
                        mode_read: 'paymenttypeall_combo'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});