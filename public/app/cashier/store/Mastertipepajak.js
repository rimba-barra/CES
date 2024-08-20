Ext.define('Cashier.store.Mastertipepajak', {
    extend: 'Ext.data.Store',
    alias: 'store.mastertipepajakstore',
    requires: [
        'Cashier.model.Mastertipepajak'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastertipepajakStore',
                model: 'Cashier.model.Mastertipepajak',
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
                        idProperty: 'tipepajakdetail_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'gettipepajakdetail'
                    }
                }
            }, cfg)]);
    }
});