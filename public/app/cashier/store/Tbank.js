Ext.define('Cashier.store.Tbank', {
    extend: 'Ext.data.Store',
    alias: 'store.tbankstore',
    requires: [
        'Cashier.model.Tbank'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TbankStore',
                model: 'Cashier.model.Tbank',
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
                        read: 'cashier/tbank/read',
                        create: 'cashier/tbank/create',
                        update: 'cashier/tbank/update',
                        destroy: 'cashier/tbank/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbank_id',
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