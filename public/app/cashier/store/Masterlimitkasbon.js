Ext.define('Cashier.store.Masterlimitkasbon', {
    extend: 'Ext.data.Store',
    alias: 'store.masterlimitkasbonstore',
    requires: [
        'Cashier.model.Masterlimitkasbon'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterlimitkasbonStore',
                model: 'Cashier.model.Masterlimitkasbon',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterlimitkasbon/read',
                        create: 'cashier/masterlimitkasbon/create',
                        update: 'cashier/masterlimitkasbon/update',
                        destroy: 'cashier/masterlimitkasbon/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'id_limitkasbon',
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