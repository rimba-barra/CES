Ext.define('Cashier.store.Postingstepsatudestination', {
    extend: 'Ext.data.Store',
    alias: 'store.postingstepsatudestinationstore',
    requires: [
        'Cashier.model.Postingstepsatudestination'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PostingstepsatudestinationStore',
                model: 'Cashier.model.Postingstepsatudestination',
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
                        read: 'cashier/postingstepsatu/readdestination',
                        create: 'cashier/postingstepsatu/createdestination',
                        update: 'cashier/postingstepsatu/updatedestination',
                        destroy: 'cashier/postingstepsatu/deletedestination'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'journal_id',
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