Ext.define('Erems.store.Paymenttype', {
    extend: 'Ext.data.Store',
    alias: 'store.paymenttypestore',
    requires: [
        'Erems.model.Paymenttype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymenttypeStore',
                model: 'Erems.model.Paymenttype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/paymenttype/read',
                        create: 'erems/paymenttype/create',
                        update: 'erems/paymenttype/update',
                        destroy: 'erems/paymenttype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'paymenttype_id',
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