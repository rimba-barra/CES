Ext.define('Cashier.store.Mergesubcoasubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.mergesubcoasubdetailstore',
    requires: [
        'Cashier.model.Mergesubcoasubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MergesubcoasubdetailStore',
                model: 'Cashier.model.Mergesubcoasubdetail',
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
                        read: 'cashier/mergesubcoa/subdetailread',
                        create: 'cashier/mergesubcoa/subdetailcreate',
                        update: 'cashier/mergesubcoa/subdetailupdate',
                        destroy: 'cashier/mergesubcoa/subdetaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'mergesubcoasubdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',

                    }
                }
            }, cfg)]);
    }
});