Ext.define('Cashier.store.Tbankvendor', {
    extend: 'Ext.data.Store',
    alias: 'store.tbankvendorstore',
    requires: [
        'Cashier.model.Tbankvendor'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TbankvendorStore',
                model: 'Cashier.model.Tbankvendor',
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
                        read: 'cashier/tbank/vendorread',
                        create: 'cashier/tbank/vendorcreate',
                        update: 'cashier/tbank/vendorupdate',
                        destroy: 'cashier/tbank/vendordelete'
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