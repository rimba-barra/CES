Ext.define('Cashier.store.Masterpajak', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpajakstore',
    requires: [
        'Cashier.model.Masterpajak'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpajakStore',
                model: 'Cashier.model.Masterpajak',
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
                        idProperty: 'tipepajak_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'getmasterpajak'
                    }
                }
            }, cfg)]);
    }
});