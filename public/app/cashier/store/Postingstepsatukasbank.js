Ext.define('Cashier.store.Postingstepsatukasbank', {
    extend: 'Ext.data.Store',
    alias: 'store.postingstepsatukasbankstore',
    requires: [
        'Cashier.model.Postingstepsatukasbank'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PostingstepsatukasbankStore',
                model: 'Cashier.model.Postingstepsatukasbank',
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
                        read: 'cashier/postingstepsatu/read',
                        create: 'cashier/postingstepsatu/create',
                        update: 'cashier/postingstepsatu/update',
                        destroy: 'cashier/postingstepsatu/delete'
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