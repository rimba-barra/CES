Ext.define('Cashier.store.Tcash', {
    extend: 'Ext.data.Store',
    alias: 'store.tcashstore',
    requires: [
        'Cashier.model.Tcash'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TcashStore',
                model: 'Cashier.model.Tcash',
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
                        read: 'cashier/tcash/read',
                        create: 'cashier/tcash/create',
                        update: 'cashier/tcash/update',
                        destroy: 'cashier/tcash/delete'
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
                        hideparam: 'default',
                        project_id:apps.project,                        
                    }
                }
            }, cfg)]);
    }
});