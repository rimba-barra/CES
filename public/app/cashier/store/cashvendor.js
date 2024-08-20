Ext.define('Cashier.store.Tcashvendor', {
    extend: 'Ext.data.Store',
    alias: 'store.tcashvendorstore',
    requires: [
        'Cashier.model.Tcashvendor'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TcashvendorStore',
                model: 'Cashier.model.Tcashvendor',
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
                        read: 'cashier/tcash/vendorread',
                        create: 'cashier/tcash/vendorcreate',
                        update: 'cashier/tcash/vendorupdate',
                        destroy: 'cashier/tcash/vendordelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbank_vendor_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});