Ext.define('Erems.store.Grouptransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.grouptransactionstore',
    requires: [
        'Erems.model.Grouptransaction'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GrouptransactionStore',
                model: 'Erems.model.Grouptransaction',
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
                        read: 'erems/admincollectioncashier/read',
                        create: 'erems/admincollectioncashier/create',
                        update: 'erems/admincollectioncashier/update',
                        destroy: 'erems/admincollectioncashier/delete'
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