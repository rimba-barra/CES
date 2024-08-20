Ext.define('Cashier.store.Tcashcia', {
    extend: 'Ext.data.Store',
    alias: 'store.tcashciastore',
    requires: [
        'Cashier.model.Tcashcia'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TcashciaStore',
                model: 'Cashier.model.Tcashcia',
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