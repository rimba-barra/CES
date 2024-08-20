Ext.define('Cashier.store.Rcashcia', {
    extend: 'Ext.data.Store',
    alias: 'store.rcashciastore',
    requires: [
        'Cashier.model.Rcashcia'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RcashciaStore',
                model: 'Cashier.model.Rcashcia',
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
                        read: 'cashier/tcash/outtransbonread',
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbon_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        project_id: apps.project
                       
                    }
                }
            }, cfg)]);
    }
});