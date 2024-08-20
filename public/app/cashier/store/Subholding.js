Ext.define('Cashier.store.Subholding', {
    extend: 'Ext.data.Store',
    alias: 'store.subholdingstore',
    requires: [
        'Cashier.model.Subholding'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubholdingStore',
                model: 'Cashier.model.Subholding',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'subholding_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getsubholding',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});