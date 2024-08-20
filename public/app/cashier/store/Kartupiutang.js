Ext.define('Cashier.store.Kartupiutang', {
    extend: 'Ext.data.Store',
    alias: 'store.kartupiutangstore',
    requires: [
        'Cashier.model.Kartupiutang'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KartupiutangStore',
                model: 'Cashier.model.Kartupiutang',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/kartupiutang/read',
                        create: 'erems/kartupiutang/create',
                        update: 'erems/kartupiutang/update',
                        destroy: 'erems/kartupiutang/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'expense_id',
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