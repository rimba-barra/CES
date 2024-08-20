Ext.define('Cashier.store.Kasbondeptdecvdept', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptdecvdeptstore',
    requires: [
        'Cashier.model.Kasbondeptdecvdept'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptdecvdeptStore',
                model: 'Cashier.model.Kasbondeptdecvdept',
                proxy: {
                    type: 'ajax',
                     timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/kasbondept/decvdeptread',
                        create: 'cashier/kasbondept/decvdeptcreate',
                        update: 'cashier/kasbondept/decvdeptupdate',
                        destroy: 'cashier/kasbondept/decvdeptdelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucher_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                    
                    }
                }
            }, cfg)]);
    }
});