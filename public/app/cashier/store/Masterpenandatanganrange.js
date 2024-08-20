Ext.define('Cashier.store.Masterpenandatanganrange', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpenandatanganrangestore',
    requires: [
        'Cashier.model.Masterpenandatanganrange'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpenandatanganrangeStore',
                model: 'Cashier.model.Masterpenandatanganrange',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterpenandatanganrange/read',
                        create: 'cashier/masterpenandatanganrange/create',
                        update: 'cashier/masterpenandatanganrange/update',
                        destroy: 'cashier/masterpenandatanganrange/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'range_penandatangan_id',
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