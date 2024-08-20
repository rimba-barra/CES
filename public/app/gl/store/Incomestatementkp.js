Ext.define('Gl.store.Incomestatementkp', {
    extend: 'Ext.data.Store',
    alias: 'store.incomestatementkpstore',
    requires: [
        'Gl.model.Incomestatementkp'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'incomestatementkpStore',
                model: 'Gl.model.Incomestatementkp',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/incomestatementkp/read',
                        create: 'cashier/incomestatementkp/create',
                        update: 'cashier/incomestatementkp/update',
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