Ext.define('Cashier.store.Rangeapprove', {
    extend: 'Ext.data.Store',
    alias: 'store.rangeapprovestore',
    requires: [
        'Cashier.model.Rangeapprove'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RangeapproveStore',
                model: 'Cashier.model.Rangeapprove',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/rangeapprove/read',
                        create: 'cashier/rangeapprove/create',
                        update: 'cashier/rangeapprove/update',
                        destroy: 'cashier/rangeapprove/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'rangeapprove_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'default',
                        user_id: apps.uid,
                        projectpt_id:0,
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});