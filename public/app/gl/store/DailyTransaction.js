Ext.define('Gl.store.Dailytransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.dailytransactionstore',
    requires: [
        'Gl.model.Dailytransaction'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DailytransactionStore',
                model: 'Gl.model.Dailytransaction',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/dailytransaction/read',
                        create: 'gl/dailytransaction/create',
                        update: 'gl/dailytransaction/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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