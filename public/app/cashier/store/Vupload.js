Ext.define('Cashier.store.Vupload', {
    extend: 'Ext.data.Store',
    alias: 'store.vuploadstore',
    requires: [
        'Cashier.model.Vupload'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VuploadStore',
                model: 'Cashier.model.Vupload',
                proxy: {
                    type: 'ajax',
                    timeout:4500000,
                    actionMethods: {
                        create: 'POST',                       
                    },
                    api: {
                        read: 'cashier/vupload/read',
                        create: 'cashier/vupload/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'summary_id',
                        root: 'data'
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