Ext.define('Gl.store.Subaccounttransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.subaccounttransactionstore',
    requires: [
        'Gl.model.Subaccounttransaction'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubaccounttransactionStore',
                model: 'Gl.model.Subaccounttransaction',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/subaccounttransaction/read',
                        create: 'gl/subaccounttransaction/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sub_coa_id',
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