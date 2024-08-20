Ext.define('Cashier.store.Grouptransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.grouptransactionstore',
    requires: [
        'Cashier.model.Grouptransaction'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GrouptransactionStore',
                model: 'Cashier.model.Grouptransaction',
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
                        read: 'cashier/grouptransaction/read',
                        create: 'cashier/grouptransaction/create',
                        update: 'cashier/grouptransaction/update',
                        destroy: 'cashier/grouptransaction/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'grouptrans_id',
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