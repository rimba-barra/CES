Ext.define('Cashier.store.Prefixcashflowcombo', {
    extend  : 'Ext.data.Store',
    alias   : 'store.prefixcashflowcombostore',
    requires: [
        'Cashier.model.Prefixcashflow'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId : 'PrefixcashflowcomboStore',
                model   : 'Cashier.model.Prefixcashflow',
                pageSize: 1000,
                proxy   : {
                    type         : 'ajax',
                    timeout      : 45000000,
                    actionMethods: {
                        read   : 'POST',
                        create : 'POST',
                        update : 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read   : 'cashier/cashfloweditor/read',
                        create : 'cashier/cashfloweditor/create',
                        update : 'cashier/cashfloweditor/update',
                        destroy: 'cashier/cashfloweditor/delete'
                    },
                    reader: {
                        type         : 'json',
                        root         : 'data',
                        idProperty   : 'prefix_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type  : 'json',
                        encode: true,
                        root  : 'data'
                    },
                    extraParams: {
                        hideparam : 'getprefixcashflow',
                        project_id: 0,
                        pt_id     : 0,
                        start     : 0,
                        limit     : 1000
                    },
                },
            }, cfg)]);
    }
});