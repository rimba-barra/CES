Ext.define('Cashier.store.Masterpenandatangan', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpenandatanganstore',
    requires: [
        'Cashier.model.Masterpenandatangan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpenandatanganStore',
                model: 'Cashier.model.Masterpenandatangan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterpenandatangan/read',
                        create: 'cashier/masterpenandatangan/create',
                        update: 'cashier/masterpenandatangan/update',
                        destroy: 'cashier/masterpenandatangan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'penandatangan_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                    ,extraParams:{
                        hideparam :'default',
                        user_id: apps.uid,
                        pt_pt_id:0,
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});