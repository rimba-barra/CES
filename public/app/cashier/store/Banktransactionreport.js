Ext.define('Cashier.store.Banktransactionreport', {
    extend: 'Ext.data.Store',
    alias: 'store.banktransactionreportstore',
    requires: [
        'Cashier.model.Banktransactionreport'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BanktransactionreportStore',
                model: 'Cashier.model.Banktransactionreport',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/banktransactionreport/read',
                        create: 'cashier/banktransactionreport/create',
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